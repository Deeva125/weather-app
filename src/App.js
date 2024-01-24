import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import swal from "sweetalert";

function App() {
  const [temp, settemp] = useState("");
  const [feelslike, setfeelslike] = useState("");
  const [maxtemp, setmaxtemp] = useState("");
  const [mintemp, setmintemp] = useState("");
  const [description, setdescription] = useState("");
  const [city, setcity] = useState("McKinney");
  const [loading, setloading] = useState(true);
  const [alert, setalert] = useState("");

  async function getWeather() {
    setloading(true);
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74651a920f391c11136d45414dce5169&units=imperial`
    );
    if (response.status !== 200) {
      swal("Location Not Found");
      return;
    }
    let data = await response.json();
    console.log(data);
    settemp(data.main.temp);
    console.log(temp);
    setfeelslike(data.main.feels_like);
    setmaxtemp(data.main.temp_max);
    setmintemp(data.main.temp_min);
    setdescription(data.weather[0].description);
    setloading(false);
    setalert("");
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="text-center">
      <h1 className="mt-2">Weather App</h1>
      <input
        value={city}
        onChange={(e) => setcity(e.target.value)}
        className="mt-2 form-control w-25 m-auto"
      ></input>
      <button
        onClick={getWeather}
        className="w-25 btn border-0 btn-primary mt-2"
      >
        Get Weather
      </button>
      {loading ? (
        <div className="card  m-auto mt-3 w-25" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6" />
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7" />
              <span className="placeholder col-4" />
              <span className="placeholder col-4" />
              <span className="placeholder col-6" />
              <span className="placeholder col-8" />
            </p>
            <a
              href="#"
              tabIndex={-1}
              className="btn btn-primary disabled placeholder col-6"
            />
            <p>{alert}</p>
          </div>
        </div>
      ) : (
        <div className="card m-auto mt-3 w-25" style={{ width: "18rem" }}>
          <div className="card-body">
            <p className="card-text">Temperature: {temp} </p>
            <p>Temperature: {temp}</p>
            <p>Feels Like: {feelslike}</p>
            <p>Minimum Temperature: {mintemp}</p>
            <p>Maximum Temperature: {maxtemp}</p>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
