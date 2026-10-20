/**
 * CT-03 — nest from parentId/depth · orphans/cycles → safe flat fallback.
 * No invent ancestry · no HTTP.
 */

/**
 * @typedef {{ id: string, parentId?: string|null, depth?: number, body?: string, attachments?: Array }} RawComment
 * @typedef {RawComment & { children: TreeNode[] }} TreeNode
 */

/**
 * @param {unknown} comments
 * @returns {{ mode: 'tree'|'flat', roots: TreeNode[], flat: RawComment[], reason: string|null }}
 */
export function buildCommentForest(comments) {
  const list = (Array.isArray(comments) ? comments : [])
    .filter((c) => c && typeof c.id === 'string' && c.id.trim())
    .map((c) => ({
      id: String(c.id),
      parentId: c.parentId == null || c.parentId === '' ? null : String(c.parentId),
      depth: Number.isFinite(Number(c.depth)) ? Math.floor(Number(c.depth)) : 0,
      body: typeof c.body === 'string' ? c.body : '',
      /* CT-22 — preserve ready/local attachment intents for CommentNode preview */
      ...(Array.isArray(c.attachments) && c.attachments.length > 0
        ? { attachments: c.attachments.map((a) => ({ ...a })) }
        : {}),
    }))

  if (list.length === 0) {
    return { mode: 'tree', roots: [], flat: [], reason: null }
  }

  const byId = new Map()
  for (const c of list) {
    if (byId.has(c.id)) {
      return { mode: 'flat', roots: [], flat: list, reason: 'duplicate-id' }
    }
    byId.set(c.id, { ...c, children: [] })
  }

  /** @param {string} startId */
  function hasCycleFrom(startId) {
    const seen = new Set()
    let cur = startId
    while (cur) {
      if (seen.has(cur)) return true
      seen.add(cur)
      const node = byId.get(cur)
      if (!node?.parentId) return false
      if (!byId.has(node.parentId)) return false
      cur = node.parentId
    }
    return false
  }

  for (const c of list) {
    if (c.parentId && hasCycleFrom(c.id)) {
      return { mode: 'flat', roots: [], flat: list, reason: 'cycle' }
    }
  }

  /** @type {TreeNode[]} */
  const roots = []
  let orphan = false

  for (const c of list) {
    const node = byId.get(c.id)
    if (!node) continue
    if (node.parentId == null) {
      roots.push(node)
      continue
    }
    const parent = byId.get(node.parentId)
    if (!parent) {
      orphan = true
      break
    }
    parent.children.push(node)
  }

  if (orphan) {
    return { mode: 'flat', roots: [], flat: list, reason: 'orphan' }
  }

  // Stable sibling order = input order
  for (const node of byId.values()) {
    node.children.sort(
      (a, b) => list.findIndex((x) => x.id === a.id) - list.findIndex((x) => x.id === b.id),
    )
  }
  roots.sort(
    (a, b) => list.findIndex((x) => x.id === a.id) - list.findIndex((x) => x.id === b.id),
  )

  return { mode: 'tree', roots, flat: list, reason: null }
}
