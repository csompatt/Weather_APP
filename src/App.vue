<template>
  <div class="app-layout">
    <header class="header">
      <search-location @push-city-data="getWeather" :selected-city="city" @show-city-name="showCity">
      </search-location>
    </header>
    <current-weather :weather-today="weatherNow" :months-array="months" @click="focusOut"></current-weather>
    <section class="forecast">
      <button class="forecast__toggle-forecast-btn" @click="toggleForecast">
        <span :class="(dailyAndHourlyForecastSwitcher) ? 'highlight' : ''">Today</span>
        <span class="toggle-forecast-btn__separate-line"> | </span>
        <span :class="(!dailyAndHourlyForecastSwitcher) ? 'highlight' : ''">Next 7 Days</span>
      </button>
      <hourly-weather v-if="dailyAndHourlyForecastSwitcher" :weather-hourly="hourlyWeather"></hourly-weather>
      <daily-forecast v-if="!dailyAndHourlyForecastSwitcher" :daily-forecast="this.dailyForecast">
      </daily-forecast>
    </section>
  </div>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import currentWeather from './components/currentWeather.vue'

export default {
  name: 'App',
  components: {
    searchLocation: defineAsyncComponent(() =>
      import('./components/searchLocation.vue')
    ),
    dailyForecast: defineAsyncComponent(() =>
      import('./components/dailyForecast.vue')
    ),
    hourlyWeather: defineAsyncComponent(() =>
      import('./components/hourlyForecast.vue')
    ),
    currentWeather
  },
  data() {
    return {
      todayDate: '',
      city: "",
      cityDisplay: false,
      dailyAndHourlyForecastSwitcher: true,
      weatherNow: {},
      hourlyWeather: [],
      dailyForecast: [],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    }
  },

  // Get the gps location and fetch the weather datas and city name or alert an error message.

  mounted() {
    const that = this;

    navigator.geolocation.getCurrentPosition(success, error);

    let position;

    function success(p) {
      position = p;

      fetch('https://locationiq.com/v1/reverse?key=pk.c92bde9b8fe296c7217ce940e120f424&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&format=json')
        .then(response => response.json())
        .then(data => {
          const cityName = data.address.town;

          that.getWeather(cityName, position.coords.latitude, position.coords.longitude)
          that.city = cityName;
        })
    }
    function error() {
      alert("We can't recognize your location, please use manual searching.");
    }
  },
  methods: {
    focusOut() {
      this.isInputFocus = false;
    },
    showCity() {
      this.cityDisplay = false;
    },
    getWeather(city, latitude, longitude) {
      this.city = city;
      this.cityDisplay = !this.cityDisplay;


      // fetch the weather datas

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely&units=metric&appid=171b9f9ea8f2cc3e669f62c7264f0397')
        .then((response) => response.json())
        .then((data) => {

          // fetch the air quality datas and convert to text
          fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + latitude + '&lon=' + longitude + '&appid=171b9f9ea8f2cc3e669f62c7264f0397')
            .then((response) => response.json())
            .then(data => {

              const airQualityDescribe = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
              const airQuality = airQualityDescribe[data.list[0].main.aqi];
              this.weatherNow['airQuality'] = airQuality;

            })

          // Add suggestion text depends on UV-index
          const uviDescription = (uviIndex) => {
            if (uviIndex <= 2) { return 'No protection required' }
            else if (uviIndex >= 3 && uviIndex <= 7) { return 'Protection required' }
            else { return 'Extra protection required' }
          }

          /* ===== Create current weather data object ===== */

          const currentData = data.current;

          this.weatherNow = {

            text: currentData.weather[0].main,
            icon: 'https://openweathermap.org/img/wn/' + currentData.weather[0].icon + '.png',
            temp: Math.round(currentData.temp),
            uvi: Math.round(currentData.uvi),
            uviText: uviDescription(currentData.uvi),
            wind: Math.round(currentData.wind_speed * 3.6),
            humidity: currentData.humidity,
          }

          /* ===== Create hourly weather data object ===== */

          this.hourlyWeather = [];

          //Convert the datum and time from UNIX time stamp

          const datum = (dt) => new Date(dt * 1000);

          for (let i = 0; 24 > i; i++) {
            const hourlyData = data.hourly[i];

            const hourlyObject = {
              time: datum(hourlyData.dt).getHours(),
              icon: 'https://openweathermap.org/img/wn/' + hourlyData.weather[0].icon + '.png',
              rainChance: Math.round(hourlyData.pop * 100),
              temp: Math.round(hourlyData.temp),
            }

            this.hourlyWeather.push(hourlyObject);
          }

          /* ===== Create daily weather data object ====== */

          this.dailyForecast = [];

          for (let i = 1; data.daily.length > i; i++) {
            const dailyData = data.daily[i];
            const dailyDatum = datum(dailyData.dt);


            const dailyObject = {
              date: dailyDatum.getFullYear() + ' - ' + (this.months[dailyDatum.getMonth()]) + ' - ' + (dailyDatum.getDate() - 1),
              icon: 'https://openweathermap.org/img/wn/' + dailyData.weather[0].icon + '.png',
              rainChance: Math.floor(dailyData.pop * 100),
              maxTemp: Math.round(dailyData.temp.max),
              minTemp: Math.round(dailyData.temp.min)
            }
            this.dailyForecast.push(dailyObject)
          }
        });
    },
    // Change the display between the daily and hourly forecast
    toggleForecast() {
      this.dailyAndHourlyForecastSwitcher = !this.dailyAndHourlyForecastSwitcher
    }
  },
}
</script>

<style scoped>
.app-layout {
  grid-template-columns: 100%;
  grid-template-rows: 10% 1fr 30%;
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  display: grid;
  max-width: 100%;
  height: 100%;

}

.header,
.forecast {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

}

.header {
  align-items: center;
  display: flex;
  width: 100%;
  padding: 0 1rem;
  border-radius: 1rem;
}

.forecast {
  border-radius: 2rem;
}

.forecast__toggle-forecast-btn {
  margin: 1rem 0 0 2rem;
  font-size: .8rem;
  font-weight: 200;
}

.toggle-forecast-btn__separate-line {
  font-size: 1.3rem;
  font-weight: 100;
}

.highlight {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>



