import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UrlRedirect() {
  const { slug } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/${slug}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status)
        } else {
          return resp.json()
        }
      })
      .then((json) => {
        window.location.href = '//' + json.long_url;
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [slug])

  return (
    <div class="flex justify-center items-center min-h-screen">
      <h1 class="text-4xl font-bold">Redirecting you...</h1>
    </div>
  )
}
