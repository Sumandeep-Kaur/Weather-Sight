let weather = {
    apiKey: /*api key here*/ ,
    fetchWeather: function (city) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) { 
        const { name } = data.city;
        const { country } = data.city;
        const { icon, description } = data.list[0].weather[0];
        const { temp, humidity, temp_min, temp_max } = data.list[0].main;
        const { speed } = data.list[0].wind;
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector("#image").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".curr-temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".min-max").innerText = Math.round(temp_min) + "°C/" + Math.round(temp_max) + "°C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed + " km/h";

        let otherDayForcast = '';
        
        var next_day = day === 6? 0 : day + 1;
        for(var i = 7; i <= 40; i+= 7){
            const { temp } = data.list[i].main;
            const { icon } = data.list[i].weather[0];
            otherDayForcast += `
                  <div class="forecast-item">
                    <div class="day">${week[next_day]}</div>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="ftemp">${Math.round(temp)}&#176;C</div>
                  </div> 
                `
                if(next_day < 6)
                    next_day++;
                else
                    next_day = 0;
                
        }
        document.querySelector(".weather-forecast").innerHTML = otherDayForcast;
        
    },
    search: function () {
      this.fetchWeather(document.querySelector(".searchInput").value);
    },
};

document
    .querySelector(".searchInput")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
});

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
const date = d.getDate();
const month = months[d.getMonth()];
const year = d.getFullYear();
const day = d.getDay();
document.querySelector(".date").innerHTML = date + " " + month + ", " + year + "<br>" + days[day];


  
weather.fetchWeather("Delhi");
