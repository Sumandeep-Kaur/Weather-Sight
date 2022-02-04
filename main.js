let weather = {
  apiKey: config.apiKey,
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
    const { temp, humidity, temp_min, temp_max, feels_like } = data.list[0].main;
    const { speed } = data.list[0].wind;
    const { dt } = data.list[0];
    document.querySelector(".city").innerText = name + ", " + country;
    document.querySelector("#image").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".curr-temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".min-max").innerText = Math.round(temp_min) + "°C/" + Math.round(temp_max) + "°C";
    document.querySelector(".humidity").innerText = humidity + "%";
    document.querySelector(".wind").innerText = speed + " km/h";
    document.querySelector(".feels_like").innerText = Math.round(feels_like) + "°C";
    document.querySelector(".date").innerHTML = dateConverter(dt) + "<br>" + days[day];

    function dateConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var date = date + ' ' + month + ', ' + year;
      return date;
    }

    function timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = hour + ':' + min + ':' + sec;
      return time;
    }
    var i = 0;
    while (i < 15) {
      const { dt } = data.list[i];
      var t = timeConverter(dt);
      if (t == "11:30:0")
        break;
      i++;
    }

    let otherDayForcast = '';

    var next_day = day === 6 ? 0 : day + 1;
    for (var j = i; j <= 40; j += 8) {
      const { temp } = data.list[j].main;
      const { icon } = data.list[j].weather[0];
      otherDayForcast += `
                      <div class="forecast-item">
                        <div class="day">${week[next_day]}</div>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="w-icon">
                        <div class="ftemp">${Math.round(temp)}&#176;C</div>
                      </div> 
                    `
      if (next_day < 6)
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


const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
const day = d.getDay();

document
  .querySelector(".searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


weather.fetchWeather("Delhi");
