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
        window.location.href = json.long_url.match(/http[s]/i)
          ? json.long_url
          : `//${json.long_url}`;
      })
      .catch((e) => {
        alert('Invalid Short Url')
        window.location.href= '/'
      })
  }, [slug])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold">Redirecting you...</h1>
    </div>
  )
}
