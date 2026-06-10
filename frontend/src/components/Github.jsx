import { useEffect, useState } from "react";
import api from "../services/api";

function Github() {

  const [events, setEvents] =
    useState([]);

  useEffect(() => {

    fetchGithub();

  }, []);

  const fetchGithub = async () => {

    try {

      const response =
        await api.get("/github");

      setEvents(
        response.data
      );

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className="card">

      <h2>💻 GitHub Activity</h2>

      {
        events.length === 0
        ? (
            <p>
              Loading Activity...
            </p>
          )
        : (
            events.map(
              (event,index) => (

                <div
                  key={index}
                  className="github-item"
                >

                  <h4>
                    {event.type}
                  </h4>

                  <p>
                    {event.repo}
                  </p>

                </div>

              )
            )
          )
      }

    </div>
  );
}

export default Github;