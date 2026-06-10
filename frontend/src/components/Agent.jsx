import { useState } from "react";
import api from "../services/api";

function Agent() {

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAgent = async () => {

    if (!query.trim()) return;

    try {

      setLoading(true);

      const res = await api.post(
        "/agent",
        {
          query
        }
      );

      setResponse(
        res.data.response
      );

    } catch (error) {

      console.error(error);

      setResponse(
        "Unable to contact AI Agent."
      );

    } finally {

      setLoading(false);
    }
  };

  const generateMyDay = async () => {

    try {

      setLoading(true);

      const res = await api.post(
        "/agent",
        {
          query: "generate my day"
        }
      );

      setResponse(
        res.data.response
      );

    } catch (error) {

      console.error(error);

      setResponse(
        "Unable to generate briefing."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="card">

      <h2>🤖 AI Agent</h2>

      <div className="agent-input-container">

        <input
          type="text"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={askAgent}
        >
          Ask
        </button>

        <button
          className="secondary-btn"
          onClick={generateMyDay}
        >
          Generate My Day
        </button>

      </div>

      <div className="response-box">

        {
          loading
          ? (
              <p>
                Thinking...
              </p>
            )
          : (
              <p>
                {response}
              </p>
            )
        }

      </div>

    </div>
  );
}

export default Agent;