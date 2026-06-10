import "./App.css";

import Weather from "./components/Weather";
import Github from "./components/Github";
import News from "./components/News";
import Tasks from "./components/Tasks";
import Agent from "./components/Agent";

function App() {

  return (

    <div className="container">

      {/* Header */}

      <div className="header">

        <h1>AI Agent Dashboard</h1>

        <p>
          Your Intelligent Productivity Hub
        </p>

      </div>

      {/* Stats Cards */}

      <div className="stats-row">

        <div className="stat-card">
          🌦
          <h3>Weather</h3>
        </div>

        <div className="stat-card">
          💻
          <h3>GitHub</h3>
        </div>

        <div className="stat-card">
          📰
          <h3>News</h3>
        </div>

        <div className="stat-card">
          🤖
          <h3>AI Agent</h3>
        </div>

      </div>

      {/* Main Dashboard */}

      <div className="dashboard-grid">

        <Weather />

        <Github />

        <News />

        <Tasks />

      </div>

      {/* AI Agent Section */}

      <div className="agent-section">

        <Agent />

      </div>

    </div>

  );
}

export default App;