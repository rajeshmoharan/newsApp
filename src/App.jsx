/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

const key = "0b36601a7baa4a50b0fbd7822955a1b5";

function App() {
  return (
    <div>
      <Navbar />
      <NewsCard />
    </div>
  );
}
export default App;

function Navbar() {
  return (
    <div>
      <ul className="flex justify-evenly text-2xl font-semibold">
        <li className="bg-blue-500 p-2 rounded-lg text-white">Home</li>
        <li className="bg-blue-500 p-2 rounded-lg text-white">Latest News</li>
        <li className="bg-blue-500 p-2 rounded-lg text-white">Bussiness</li>
        <li className="bg-blue-500 p-2 rounded-lg text-white">Sports</li>
        <li className="bg-blue-500 p-2 rounded-lg text-white">Login</li>
        <li className="bg-blue-500 p-2 rounded-lg text-white">Signup </li>
      </ul>
    </div>
  );
}

function NewsCard() {
  const [article, setArticle] = useState([]);
  const [isOpen,setIsOpen] = useState(null);

  useEffect(() => {
    async function news() {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${key}`
      );
      const data = await res.json();
      setArticle(data.articles);
      console.log(data.articles);
    }
    news();
  }, []);
  return (
    <div>
      <div  className="flex flex-wrap gap-4 mr-6 mt-10 justify-evenly">
        {article.map((news, i) => (
          <NewsItem key={i} news={news} num={i} isOpen={isOpen} setIsOpen={setIsOpen} />
        ))}
      </div>
    </div>
  );
}

function NewsItem({ news,isOpen,setIsOpen ,num}) {

  const Open = num === isOpen;

  const handleClicked = () => {
    setIsOpen(isOpen ? null : num)
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={news.urlToImage}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{news.title}</div>
        <p className="text-gray-700 text-base">{news.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {news.author}
        </span>
        <button onClick={handleClicked} className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          ReadMe{Open && news.url}
        </button>
      </div>
    </div>
  );
}
