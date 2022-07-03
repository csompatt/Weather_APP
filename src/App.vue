<template>
  <div class="app-layout">
    <header class="header">
      <search-location @push-city-data="getWeather" :selected-city="returnedCity" @show-city-name="showCity">
      </search-location>

    </header>
    <current-weather :weather-today="weatherNow" :today-datum="todayDate"></current-weather>


    <section class="forecast">
      <button class="forecast__switch-forecast-btn" @click="toggleForecast"><span class="switch-forecast-btn__text"
          :class="(weeklyAndHourlyForecastSwitcher) ? 'highlight' : ''">Today</span><span
          class="switch-forecast-btn__separate-line"> | </span><span class="switch-forecast-btn__text"
          :class="(!weeklyAndHourlyForecastSwitcher) ? 'highlight' : ''">Next 7 Days</span>
      </button>
      <hourly-weather v-if="weeklyAndHourlyForecastSwitcher" :weather-hourly="hourlyWeather"></hourly-weather>
      <weekly-forecast v-if="!weeklyAndHourlyForecastSwitcher" class="weeklyForecast"
        :daily-forecast="this.dailyForecast"></weekly-forecast>
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
    weeklyForecast: defineAsyncComponent(() =>
      import('./components/weeklyForecast.vue')
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
      weeklyAndHourlyForecastSwitcher: true,
      weatherNow: {},
      hourlyWeather: [],
      dailyForecast: [],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  },
  computed: {
    returnedCity() {
      return this.city;
    }
  },
  beforeMount() {
    const that = this;

    const todayDate = () => this.months[new Date().getMonth()] + ',' + new Date().getDate();
    this.todayDate = todayDate();

    navigator.geolocation.getCurrentPosition(success, error);

    var position;

    function success(p) {
      position = p;

      fetch('https://api.geoapify.com/v1/geocode/reverse?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&format=json&apiKey=a2cc5a2783724fdf9b2aeee18c4157a3')
        .then((response) => response.json())
        .then(data => {
          let cityName = data.results[0].city;

          that.getWeather(cityName, position.coords.latitude, position.coords.longitude)
          that.city = cityName;

        });




    }

    function error() {
      alert("We can't recognize your location, please use manual searching.");
    }
  },

  methods: {
    showCity() {
      this.cityDisplay = false;
    },

    getWeather(city, latitude, longitude) {
      this.city = city;
      this.cityDisplay = !this.cityDisplay;

      // Add the city name to the header

      // fetch the weather datas
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely&units=metric&appid=171b9f9ea8f2cc3e669f62c7264f0397')
        .then((response) => response.json())
        .then((data) => {

          // fetch the air quality datas and convert to text
          fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + latitude + '&lon=' + longitude + '&appid=171b9f9ea8f2cc3e669f62c7264f0397')
            .then((response) => response.json())
            .then(data => {

              const airQualityDescribe = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
              let airQuality = airQualityDescribe[data.list[0].main.aqi];
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
            let hourlyData = data.hourly[i];

            let hourlyObject = {
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
            let dailyData = data.daily[i];
            let dailyDatum = datum(dailyData.dt);


            let dailyObject = {
              date: dailyDatum.getFullYear() + ' / ' + (this.months[dailyDatum.getMonth()]) + ' / ' + (dailyDatum.getDate() - 1),
              icon: 'https://openweathermap.org/img/wn/' + dailyData.weather[0].icon + '.png',
              rainChance: Math.floor(dailyData.pop * 100),
              maxTemp: Math.round(dailyData.temp.max),
              minTemp: Math.round(dailyData.temp.min)
            }
            this.dailyForecast.push(dailyObject)
          }
        });
    },
    toggleForecast() {
      this.weeklyAndHourlyForecastSwitcher = !this.weeklyAndHourlyForecastSwitcher
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
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.header__location-container {
  text-align: end;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}


.header {
  width: 100%;
  border-radius: 1rem;
}

.header__location__icon {
  margin-left: 1rem;
}

.header__location__city-name {
  display: inline-block;
  font-size: 1rem;
}

.forecast {
  border-radius: 2rem;
}





.autocomplete-container {
  position: relative;
}

.forecast__switch-forecast-btn {
  margin-left: 2rem;
  margin-top: 1rem;
  font-weight: 700;
  font-size: .8rem;
}

.switch-forecast-btn__text {
  font-size: .8rem;
  font-weight: 200;
}

.highlight {
  font-size: 1.2rem;
  font-weight: 500;
}

.switch-forecast-btn__separate-line {
  font-size: 1.3rem;
  font-weight: 100;
}
</style>



