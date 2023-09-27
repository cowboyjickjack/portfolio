let weather = {
    fetchWeather: function(city) {
        fetch (
            "https://api.openweathermap.org/data/2.5/forecast?q=" 
            + city 
            + "&appid=" 
            + this.forecastkey
            + "&units=imperial"
            )
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data.city;
        const { icon, description } = data.list[0].weather[0];
        const { temp, humidity } = data.list[0].main;
        const { speed } = data.list[0].wind;

        // Select the element with class "city" and set its content to the city name
        const cityElement = document.querySelector(".city");
        const iconElement = document.querySelector(".icon");
        const descElement = document.querySelector(".description");
        const tempElement = document.querySelector(".temp");
        const humidElement = document.querySelector(".humidity");
        const speedElement = document.querySelector(".wind");


        document.querySelector = cityElement.innerHTML = "Weather in " + name;
        document.querySelector = iconElement.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector = descElement.innerHTML = description;
        document.querySelector = tempElement.innerHTML = Math.trunc(temp) + "°F";
        document.querySelector = humidElement.innerHTML = humidity + "%";
        document.querySelector = speedElement.innerHTML = speed + "mph";


        console.log(name, icon, description, temp, humidity, speed);
    }
};

weather.fetchWeather("san antonio");