let searchInput = document.querySelector('.search-input');
const currentWeather = document.querySelector('.current-weather')
// const weatherIcon = document.querySelector('.weather-icon')
const hourLyWeathers = document.querySelector('.hourly-weather .weather-list');
const locationButton = document.querySelector('.location-button')


const API_KEY ='3012700b25ed4787969131944241809';

const weatherCode = {
 clear: [1000],
 clouds: [1003, 1006, 1009],
 mist: [1030, 1135, 1147],
 rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
 moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
 snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
 thunder: [1087, 1279, 1282],
 thunder_rain: [1273, 1276],
}

const displayHourlyForecast = (hourlyData)=>{
 const currentHour = new Date().setMinutes(0,0,0);
 const next24Hours = currentHour + 24*60*60*1000;

 const next24HoursData = hourlyData.filter(({time}) =>{
  const forecastTime = new Date(time).getTime();
  return forecastTime >= currentHour && forecastTime <= next24Hours;
 })
 let weather = next24HoursData.map(item => {
  const temperature =  item.temp_c;
  const time = item.time.split(' ')[1].substring(0,5);
 
  const weatherIcon = Object.keys(weatherCode).find(icon =>weatherCode[icon].includes(item.condition.code))


  return ` <li class="weather-item">
      <p class="time">${time}</p>
      <img src="icons/${weatherIcon}.svg" alt="" class="weather-icon">
      <p class="temperature">${temperature}°</p>
     </li>`
 }).join('')
 hourLyWeathers.insertAdjacentHTML('afterbegin',weather)
}

const getweatheDetails =async (API_URL) => {

    window.innerWidth <= 768 && searchInput.blur()
    document.body.classList.remove('show-no-results');


try {
 const response = await   fetch(API_URL);
 const data = await response.json();
 const temperature =  data.current.temp_c;
 const description = data.current.condition.text;

 const weatherIcon = Object.keys(weatherCode).find(icon =>weatherCode[icon].includes(data.current.condition.code))

 currentWeather.querySelector('.temperature').innerHTML =`${temperature} <span>°C</span>`
 currentWeather.querySelector('.description').innerText = description;
 currentWeather.querySelector('.weather-icon').src =`icons/${weatherIcon}.svg`;


 const combineHOurelyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]

displayHourlyForecast(combineHOurelyData)
searchInput.value = data.location.name;
} catch(error){

}
 }

const setupWeatherRequest = (cityName) =>{
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;
getweatheDetails(API_URL);
}

searchInput.addEventListener('keyup',(e)=>{
 let cityName = searchInput.value.trim()
 if(e.key == 'Enter' && cityName){
  
  setupWeatherRequest(cityName)
 }
})

locationButton.addEventListener('click',()=>{
navigator.geolocation.getCurrentPosition(position => {
console.log(position);

const {latitude,logitude} = position.coords;
const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${logitude}&days=2`;
getweatheDetails(API_URL);

},error =>{
alert('Loacatio access denied. please enable  permissinons to use this feature')
}
  )
})

setupWeatherRequest('london')