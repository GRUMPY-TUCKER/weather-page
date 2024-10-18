
const input = document.querySelector("input");
const searchButton =  document.querySelector("#search-btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const datetime = document.querySelector(".datetime");

searchButton.addEventListener("click",()=>{
    let city = input.value;
    getWeather(city);
})

let getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=03348ab4b90e5f651880dfbbd490d2cf`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);  // Log the data to see what you're receiving
        const iconCode = data.weather[0].icon;
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;
 
        const weatherCity = data.name;   //from json file
        const weatherCountry = data.sys.country;   //from json file
        weather.innerHTML =  `${weatherCity}, ${weatherCountry}`; //re-write


        let weatherTemperature = data.main.temp;  //from json file  //given in KELVIN
        weatherTemperature = weatherTemperature - 273;
        const temp = weatherTemperature.toFixed(2);
        temperature.innerHTML = `${temp}°C`; //re-write

        const weatherDescription = data.weather[0].description;
        description.innerHTML = weatherDescription.toUpperCase();

        const timezoneOffset = data.timezone;
            const localTime = new Date(Date.now() + timezoneOffset * 1000);
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC'
            };
            const formattedDateTime = localTime.toLocaleString('en-US', options);
            datetime.innerHTML = formattedDateTime;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  };


