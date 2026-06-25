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

      if (Array.isArray(response.data)) {

        setActivities(response.data);

      } else {

        setActivities([]);

      }

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

      <h2>💻 GitHub Activity</h2>

      <input
        type="text"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        placeholder="GitHub username"
      />

      <button
        onClick={fetchGithub}
      >
        Search
      </button>

      {loading ? (

        <p>Loading...</p>

      ) : activities.length === 0 ? (

        <p>No activity found</p>

      ) : (

        activities.map((activity, index) => (

          <div
            key={index}
          >
            <strong>
              {activity.type}
            </strong>

            <br />

            {activity.repo}
          </div>

        ))

      )}

    </div>
  );
}

export default Github;