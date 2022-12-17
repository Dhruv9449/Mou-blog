import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './screens/Blog';
import Home from './screens/Home';
import Preloader from './screens/Preloader';
import PageNotFound from './screens/PageNotFound';
import Post from './screens/Post';



function App() {
  return (
    <div className="app theme" id="app">
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog/:slug" element={<Blog />} />

          <Route path="/newpost" element={localStorage.getItem("role") ? localStorage.getItem("role") === "admin" ? <Post edit={false} /> : <PageNotFound error="Page not found" status={404} /> : <PageNotFound error="Page not found" status={404} />} />
          <Route path="*" element={<PageNotFound error="Page not found" status={404} />} />

          <Route path="/editpost/:slug" element={localStorage.getItem("role") ? localStorage.getItem("role") === "admin" ? <Post edit={true} /> : <PageNotFound error="Page not found" status={404} /> : <PageNotFound error="Page not found" status={404} />} />
          <Route path="*" element={<PageNotFound error="Page not found" status={404} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
