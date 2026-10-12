/**
 * DS §7 CommentTextInput — multiline draft field.
 */
export function CommentTextInput({
  id,
  value,
  onChange,
  placeholder,
  rows = 1,
  disabled = false,
  testId = 'comment-composer-input',
}) {
  return (
    <textarea
      id={id}
      className="comment-text-input"
      data-ds-surface="CommentTextInput"
      data-testid={testId}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
