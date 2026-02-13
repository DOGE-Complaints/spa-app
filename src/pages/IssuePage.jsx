import { useParams } from 'react-router-dom'

export function IssuePage() {
  const { id } = useParams()

  return (
    <main>
      <h1>dogeestonia</h1>
      <p>Issue placeholder: {id}</p>
    </main>
  )
}
