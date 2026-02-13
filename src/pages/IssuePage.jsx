import { useParams } from 'react-router-dom'

export function IssuePage() {
  const { id } = useParams()

  return (
    <main>
      <h1>DOGEstonia</h1>
      <p>Issue placeholder: {id}</p>
    </main>
  )
}
