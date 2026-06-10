import { useState, useEffect } from "react";
import api from "../services/api";

function Weather() {

  const [city, setCity] = useState("Pune");

  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {

    try {

      const response = await api.get(
        `/weather?city=${city}`
      );

      setWeather(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchWeather();

  }, []);

  return (

    <div className="card">

      <h2>🌦 Weather</h2>

      <div className="weather-search">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={fetchWeather}
        >
          Search
        </button>

      </div>

      {

        weather?.error ? (

          <p>{weather.error}</p>

        ) : weather && (

          <>

            <div className="weather-info">

              <h1>
                {weather.temperature}°C
              </h1>

              <h3>
                {weather.city}
              </h3>

              <p>
                {weather.condition}
              </p>

              <p>
                Humidity:
                {" "}
                {weather.humidity}%
              </p>

              <p>
                Wind:
                {" "}
                {weather.wind_speed}
                {" "}
                m/s
              </p>

            </div>

          </>

        )

      }

    </div>
  );
}

export default Weather;