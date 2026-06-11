import { useEffect, useState } from "react";
import api from "../services/api";

function Github() {

  const [activities, setActivities] = useState([]);
  const [username, setUsername] = useState("octocat");
  const [loading, setLoading] = useState(false);

  const fetchGithub = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        `/github?username=${username}`
      );

      setActivities(response.data);

    } catch (error) {

      console.error(error);

      setActivities([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchGithub();

  }, []);

  return (

    <div className="card">

      <h2>
        GitHub Activity
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px"
        }}
      >

        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <button
          onClick={fetchGithub}
        >
          Search
        </button>

      </div>

      {loading ? (

        <p>
          Loading activity...
        </p>

      ) : activities.error ? (

        <p>
          {activities.error}
        </p>

      ) : (

        activities.map(
          (activity, index) => (

            <div
              key={index}
              style={{
                marginBottom: "10px"
              }}
            >

              <strong>
                {activity.type}
              </strong>

              <br />

              <span>
                {activity.repo}
              </span>

            </div>

          )
        )

      )}

    </div>

  );
}

export default Github;