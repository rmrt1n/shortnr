export default function UrlOutput({ shortUrl }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
  }

  return (
    <div className="border-2 border-green-100 p-3 rounded flex justify-center items-center font-mono">
      <a href={ `//${shortUrl}` } rel="noreferrer" target="_blank" className="underline">{ shortUrl }</a>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 ml-2 cursor-pointer" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
        onClick={ copyToClipboard }
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </div>
  )
}
