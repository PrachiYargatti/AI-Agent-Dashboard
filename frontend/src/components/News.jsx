import { useEffect, useState } from "react";
import api from "../services/api";

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    fetchNews();

  }, []);

  const fetchNews = async () => {

    try {

      const response =
        await api.get("/news");

      setNews(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="card">

      <h2>📰 Tech News</h2>

      <div className="news-container">

        {
          Array.isArray(news) && news.length > 0
            ? news.map((item, index) => (

                <div
                  key={index}
                  className="news-item"
                >

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="news-link"
                  >
                    {item.title}
                  </a>

                </div>

              ))
            : <p>No news available</p>
        }

      </div>

    </div>
  );
}

export default News;