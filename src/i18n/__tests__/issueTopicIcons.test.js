import { describe, expect, it } from 'vitest'
import { ISSUE_TOPIC_ICON_BY_LABEL, topicIconForLabel } from '../issueTopicIcons.js'

describe('issueTopicIcons FR-ES-05.6', () => {
  it('maps only explicit catalog labels — no glob, no invented synonyms', () => {
    expect(topicIconForLabel('waste')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.waste)
    expect(topicIconForLabel('Waste')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.waste)
    expect(topicIconForLabel('transit')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.transit)
    expect(topicIconForLabel('greenspace')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.greenspace)
    expect(topicIconForLabel('lighting')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.lighting)
    expect(topicIconForLabel('housing')).toBe(ISSUE_TOPIC_ICON_BY_LABEL.housing)
    expect(topicIconForLabel('infrastructure')).toBeNull()
    expect(topicIconForLabel('mobility')).toBeNull()
    expect(topicIconForLabel('safety')).toBeNull()
    expect(ISSUE_TOPIC_ICON_BY_LABEL).not.toHaveProperty('infrastructure')
  })
})
