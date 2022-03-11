import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import UrlForm from './components/UrlForm/UrlForm';
import UrlRedirect from './components/UrlRedirect/UrlRedirect'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <UrlForm /> } />
          <Route exact path="/:slug" element={ <UrlRedirect /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
