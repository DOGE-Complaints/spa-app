/** @typedef {'primary' | 'secondary' | 'tertiary' | 'link'} ButtonHierarchy */
/** @typedef {'small' | 'medium' | 'large'} ButtonSize */
/** @typedef {'horizontal' | 'vertical'} ButtonGroupOrientation */
/** @typedef {'start' | 'center' | 'end' | 'stretch'} ButtonGroupAlign */
/**
 * @typedef {'commit' | 'continue' | 'navigate' | 'external' | 'open' | 'dismiss' | 'cancel' | 'reset' | 'retry' | 'destructive' | 'authentication' | 'submission' | 'logout' | 'action' | string} ButtonIntent
 */

export const BUTTON_HIERARCHIES = Object.freeze(['primary', 'secondary', 'tertiary', 'link'])
export const BUTTON_SIZES = Object.freeze(['small', 'medium', 'large'])

export const DEFAULT_HIERARCHY = /** @type {ButtonHierarchy} */ ('secondary')
export const DEFAULT_SIZE = /** @type {ButtonSize} */ ('medium')
