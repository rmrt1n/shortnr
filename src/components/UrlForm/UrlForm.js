import { useState } from 'react'
import { Circles } from 'react-loading-icons'
import UrlOutput from '../UrlOutput/UrlOutput'

export default function UrlForm() {
  const [longUrl, setlongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url) => {
    const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
    const isValid = url.match(re) ?? false;
    if (!isValid) {
      setInvalidUrl(true);
      setTimeout(() => setInvalidUrl(false), 5000);
    }
    return isValid;
  }
  
  const shortenUrl = (e) => {
    e.preventDefault();
    setInvalidUrl(false);
    setShortUrl('');
    if (!isValidUrl(longUrl)) return;
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/shorten?url=${longUrl}`)
      .then((resp) => {
        if (resp.ok) return resp.json()
        throw new Error('Error fetching API')
      })
      .then((json) => {
        setLoading(false);
        setShortUrl(`${process.env.REACT_APP_HOST_NAME}/${json.slug}`)
      })
      .catch((e) => console.log(e.message))
  }

  return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[32rem] sm:border-2 sm:rounded-md sm:shadow-xl py-16 px-8">
          <h1 className="text-2xl font-bold">Generate Short URL</h1>
          <p className="text-lg text-gray-500 mb-8">Url shortener to make sharing links easier.</p>
    <form className="flex flex-col space-y-4" onSubmit={ shortenUrl }>
      <input 
        placeholder="Your URL" 
        className="border-2 p-3" 
        value={ longUrl } 
        onChange={ (e) => setlongUrl(e.target.value) }
      />
      <button className="bg-lime-500 hover:bg-lime-600 text-white p-3 rounded font-bold flex justify-center">
        { loading ? <Circles className="h-5 w-5 text-center" /> : 'Shorten' }
      </button>

      { invalidUrl && 
        <div className="bg-red-200 p-3 rounded text-center">
          Invalid url!
        </div>
      }

      { shortUrl && shortUrl.length > 0 && <UrlOutput shortUrl={shortUrl} /> }
    </form>
        </div>
      </div>
  )
}
