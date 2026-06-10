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
          news.length === 0
          ? (
              <p>
                Loading News...
              </p>
            )
          : (
              news.map(
                (item, index) => (

                  <div
                    className="news-item"
                    key={index}
                  >

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>

                    <p>
                      {item.source}
                    </p>

                  </div>

                )
              )
            )
        }

      </div>

    </div>
  );
}

export default News;