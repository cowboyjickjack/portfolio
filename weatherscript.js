let weather = {
    fetchWeather: function(city) {
        fetch (
            "https://api.openweathermap.org/data/2.5/forecast?q=" 
            + city 
            + "&appid=" 
            + this.FORECAST_API_KEY
            )
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.list[0].weather[0];
        const { temp, humidity } = data.list[0].main;
        const { speed } = data.list[0].wind;
        console.log(name, icon, description, temp, humidity, speed);
    }
};

weather.fetchWeather("denver");

