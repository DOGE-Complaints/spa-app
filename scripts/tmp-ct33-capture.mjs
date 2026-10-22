/**
 * CT-33 Path A — composer / attach dark residual.
 * OP eye Absent · Partial visual = BLOCK · no invent PASS.
 *
 * Env: CT33_BASE · PUPPETEER_EXECUTABLE_PATH
 */
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storyRoot = path.resolve(
  __dirname,
  '../docs/tasks/epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-33-composer-dark-residual',
)
const outDir = path.join(storyRoot, 'screenshots/full-cycle')
const baselineDir = path.join(storyRoot, 'ui-baseline')
const storyShotDir = path.join(storyRoot, 'screenshots')
mkdirSync(outDir, { recursive: true })
mkdirSync(baselineDir, { recursive: true })
mkdirSync(storyShotDir, { recursive: true })

const chrome =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.CT33_BASE || 'http://127.0.0.1:5173'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1536, height: 1024 })
const md5s = []
const fails = []

async function capture(dir, file, el) {
  const dest = path.join(dir, file)
  let target = el
  if (target) {
    await page.evaluate((node) => {
      try {
        node.scrollIntoView({ block: 'center', inline: 'nearest' })
      } catch {
        /* ignore */
      }
    }, target).catch(() => {})
    await sleep(100)
  }
  const box = target ? await target.boundingBox().catch(() => null) : null
  if (!box || box.width < 2 || box.height < 2) {
    target = await page.$('body')
  }
  await target.screenshot({ path: dest })
  const md5 = createHash('md5').update(readFileSync(dest)).digest('hex')
  console.log(`${file} ${md5}`)
  md5s.push({ file, md5, prefix: md5.slice(0, 12) })
}

async function setTheme(theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('dogestonia.theme', t)
    } catch {
      /* ignore */
    }
  }, theme)
  await sleep(400)
}

async function openLabComposer() {
  await page.goto(`${base}/#/lab/feed`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForSelector('[data-testid="feed-lab-page"]', { timeout: 20000 })
  await page.waitForSelector('[data-testid="feed-lab-greenfield-section"]', { timeout: 10000 })
  await page.evaluate(() => {
    document.querySelectorAll('[data-lab-ct08-stand], [data-testid^="feed-lab-ct2"]').forEach((n) => {
      n.style.display = 'none'
    })
  })
  await sleep(200)
  const cardId = await page.evaluate(() => {
    const gf = document.querySelector('[data-testid="feed-lab-greenfield-section"]')
    const card = gf?.querySelector('[data-testid^="feed-post-card-"]')
    return card?.getAttribute('data-testid') || null
  })
  if (!cardId) {
    fails.push('lab-card-missing')
    return null
  }
  const sel = `[data-testid="${cardId}"]`
  await page.evaluate((s) => {
    const card = document.querySelector(s)
    const view = [...(card?.querySelectorAll('button, a, [role="button"]') || [])].find((b) =>
      /view discussion|view replies|comment/i.test(b.textContent || ''),
    )
    view?.click()
  }, sel)
  await sleep(600)
  await page.waitForSelector(`${sel} [data-testid="tm-thread-composer"], [data-testid="tm-issue-thread-block"]`, {
    timeout: 15000,
  }).catch(() => {
    fails.push('composer-wait')
  })
  return sel
}

async function probeComposer() {
  return page.evaluate(() => {
    const theme = document.documentElement.getAttribute('data-theme')
    const ta = document.querySelector('.tm-thread-composer__textarea')
    const attach = document.querySelector('[data-testid="tm-composer-attach"]')
    const attachIcon = document.querySelector('[data-testid="tm-composer-attach-icon"]')
    const post = document.querySelector('[data-testid="tm-composer-post"]')
    const postLabel = document.querySelector('[data-testid="tm-composer-post-label"]')
    const plate = document.querySelector('.tm-attachment-ref')
    const ts = ta ? getComputedStyle(ta) : null
    const as = attach ? getComputedStyle(attach) : null
    const ps = post ? getComputedStyle(post) : null
    const pls = postLabel ? getComputedStyle(postLabel) : null
    const plateS = plate ? getComputedStyle(plate) : null
    return {
      theme,
      textareaBg: ts?.backgroundColor || null,
      textareaColor: ts?.color || null,
      attachColor: as?.color || null,
      attachMask: attachIcon?.getAttribute('data-ns07') === 'mask',
      postColor: pls?.color || ps?.color || null,
      postBg: ps?.backgroundColor || null,
      plateBg: plateS?.backgroundColor || null,
      hasComposer: Boolean(document.querySelector('[data-testid="tm-thread-composer"]')),
    }
  })
}

try {
  const cardSel = await openLabComposer()
  await setTheme('dark')
  await sleep(300)

  // Type into textarea for readable text shot
  const ta = await page.$('.tm-thread-composer__textarea')
  if (ta) {
    await page.evaluate((el) => {
      el.scrollIntoView({ block: 'center', inline: 'nearest' })
      el.focus()
      el.value = 'Dark residual typed comment for CT-33'
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }, ta)
    await sleep(200)
  } else {
    fails.push('textarea-absent')
  }

  let p = await probeComposer()
  if (!p.hasComposer) fails.push('composer-absent')
  if (p.textareaBg && /rgb\(255,\s*255,\s*255\)/.test(p.textareaBg)) fails.push('textarea-still-white')
  if (!p.attachMask) fails.push('attach-mask-absent')

  const composer =
    (await page.$('[data-testid="tm-thread-composer"]')) ||
    (cardSel ? await page.$(`${cardSel} [data-testid="tm-issue-thread-block"]`) : null) ||
    (await page.$('body'))

  await capture(outDir, '01-composer-dark-textarea.png', composer)

  // Soft attach plate: open picker if possible — else capture attach control
  const attachBtn = await page.$('[data-testid="tm-composer-attach"]')
  if (attachBtn) await capture(outDir, '04-attach-control-dark.png', attachBtn)
  else {
    await capture(outDir, '04-attach-control-dark.png', composer)
    fails.push('attach-soft-miss')
  }

  // Try to seed AttachmentRef via file input
  const fileInput = await page.$('[data-testid="tm-composer-file-input"]')
  if (fileInput) {
    const tmpPng = path.join(outDir, '_seed-attach.png')
    // 1x1 png
    writeFileSync(
      tmpPng,
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64',
      ),
    )
    await fileInput.uploadFile(tmpPng)
    await sleep(500)
  }
  const plate =
    (await page.$('.tm-attachment-ref')) ||
    (await page.$('[data-testid="tm-composer-attachments"]')) ||
    composer
  await capture(outDir, '02-attach-plates-themed.png', plate)

  const postEl =
    (await page.$('[data-testid="tm-composer-post"]')) ||
    (await page.$('.tm-thread-composer__actions')) ||
    composer
  await capture(outDir, '03-post-label-contrast.png', postEl)

  await setTheme('light')
  await sleep(300)
  p = await probeComposer()
  await capture(outDir, '05-composer-light-hold.png', composer)

  copyFileSync(path.join(outDir, '01-composer-dark-textarea.png'), path.join(storyShotDir, '01-story-root-composer-dark.png'))
  copyFileSync(path.join(outDir, '02-attach-plates-themed.png'), path.join(storyShotDir, '02-story-root-attach-plates.png'))
  copyFileSync(path.join(outDir, '03-post-label-contrast.png'), path.join(storyShotDir, '03-story-root-post-attach.png'))
  copyFileSync(path.join(outDir, '01-composer-dark-textarea.png'), path.join(baselineDir, '01-story-root-composer-dark.png'))
  copyFileSync(path.join(outDir, '02-attach-plates-themed.png'), path.join(baselineDir, '02-story-root-attach-plates.png'))
  copyFileSync(path.join(outDir, '03-post-label-contrast.png'), path.join(baselineDir, '03-story-root-post-attach.png'))

  const meta = {
    story: 'STORY-SPA-CT-33-composer-dark-residual',
    captured_at: new Date().toISOString(),
    visual_gate: 'BLOCK',
    op_eye: 'Absent',
    fails,
    md5s,
    probe: await probeComposer(),
    note: 'Partial visual=BLOCK · no invent OP PASS · light held',
  }
  writeFileSync(path.join(outDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  writeFileSync(path.join(storyShotDir, 'CAPTURE-META.json'), JSON.stringify(meta, null, 2))
  console.log('CAPTURE-META', JSON.stringify({ fails, prefixes: md5s.map((m) => m.prefix), probe: meta.probe }))
  if (fails.length) process.exitCode = 1
} catch (err) {
  console.error(err)
  fails.push(String(err?.message || err))
  writeFileSync(
    path.join(outDir, 'CAPTURE-META.json'),
    JSON.stringify({ story: 'STORY-SPA-CT-33', fails, error: String(err) }, null, 2),
  )
  process.exitCode = 1
} finally {
  await browser.close()
}
