import React, {useState} from "react";
// for API
import axios from "axios";

/** TODO 
 * rearrange card display**/

function App() {

  // Process the API response
  const [data, setData] = useState({});
  const [location, setLocation] = useState(''); // Declare location,city,temp, etc state
  const [cityName, setCityName] = useState(''); 
  const [date, setDateTime] = useState('');
  const [temp, setTemp] = useState('');
  const [highTemp, setHigh] = useState('');
  const [lowTemp, setLow] = useState('');
  const [description, setDescription] = useState('');
  const [feels, setFeels] = useState('');
  const [humidity, setHumidity] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${weatherKey}&units=imperial`

  const searchLocation = (event) => {
    // Handle the case when user hits enter or clicks search
    if (event.key === 'Enter' || event.type === 'click') {

      // Handle the case where the input is empty
      if (!location || !isNaN(location)) {
        alert("Please enter a city name.");
        return;
      }

      axios.get(url).then((response) => {
        // setData(response.data);
        setData(response.data.list.slice(0, 5)); // get first 5
        console.log(response.data);
        
        // date reformatting
        const timestamp = response.data.list[0].dt * 1000; // Convert from seconds to milliseconds
        const date = new Date(timestamp);
        const options = { weekday: 'long' }; // 'long' will give you the full day name
        const dayOfWeek = date.toLocaleDateString(undefined, options);
        console.log(dayOfWeek);

        setCityName(response.data.city.name);
        setDateTime(dayOfWeek);
        setTemp(response.data.list[0].main.temp);
        setHigh(response.data.list[0].main.temp_min);
        setLow(response.data.list[0].main.temp_max);
        setDescription(response.data.list[0].weather[0].description);
        setFeels(response.data.list[0].main.feels_like);
        setHumidity(response.data.list[0].main.humidity);
        setIcon(response.data.list[0].weather[0].icon);
        setWind(response.data.list[0].wind.speed);

      })

      // .catch((error) => {
      //   console.log(error);
      //   alert("City not found or API request failed.");
      // });
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          alert("City not found or API request failed. Please try again.");
        }
      });

      setLocation('')
    }
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      alert("Enter has been hit");
      searchLocation(event);
    }
  };

  return (

    <div className="app">

      <div className="search">
        <input 
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={handleEnter}
        placeholder="Enter City"
        type="text" />
        <button type="submit" onClick={searchLocation}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
        </button>
      </div>

      <div className="container">
        <div className="card">
          
          <div className="top">
            <div className="location">
              <h4>{cityName}</h4>
              <div className="date">
                <h5>{date}</h5>
              </div>
            </div>
            <div className="temp">
              <div className="currentTemp">
                <h2>{Math.trunc(temp)}°F
                <div className="highAndLow">
                  <h5>H: {Math.trunc(highTemp)}°F</h5>
                  <h5>L: {Math.trunc(lowTemp)}°F</h5>
                </div>
                </h2>
              </div>
            </div>
            <div className="description">
              {description && icon && ( // Checks if both description and icon are available
                <div>
                  <h4>{description}</h4>
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather-icon"/>
                </div>
              )}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <h4>Feels like: {Math.trunc(feels)}°F</h4>
            </div>
            <div className="humidity">
              <h4>Humidity: {humidity}%</h4>
            </div>
            <div className="wind">
              <h4>Wind Speed: {Math.trunc(wind)} MPH</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
