<template>
  <article class="current-weather__container">
    <section class="current-weather">
      <div class="current-weather__info-container">
        <div class="current-weather__info-items-container">
          <h4 class="current-date info-name"> {{ todayDatum }}</h4>
          <img class="current-weather__icon" :src="weatherToday.icon" alt="">
        </div>
        <h2 class="info__item"> {{ weatherToday.text }}</h2>
      </div>
      <div class="current-weather__info-container">
        <h4 class="info-name">Humidity</h4>
        <h2 class="info__item">{{ weatherToday.humidity }}<span class="info-unit">%</span></h2>
      </div>
      <div class="current-weather__info-container">
        <h4 class="info-name">Wind</h4>
        <h2 class="info__item">{{ weatherToday.wind }}<span class="info-unit">km/h</span></h2>
      </div>
      <div class="current-weather__info-container">
        <h4 class="info-name">Air Quality</h4>
        <h2 class="info__item">{{ weatherToday.airQuality }}</h2>
      </div>
    </section>
    <section class="current-weather__temperature">
      <h4 class="info-name">Temperature</h4>
      <h2 class="info__item">{{ weatherToday.temp }}<span class="info-unit"><sup>o</sup>C</span></h2>
    </section>
    <section class="current-weather__uv-index">
      <h4 class="info-name">UV-Index</h4>
      <h2 class="info__item">{{ weatherToday.uvi }}</h2>
      <h4 class="info-name">{{ weatherToday.uviText }}</h4>
    </section>
  </article>
</template>

<script>

export default {
  name: 'currentWeather',
  props: ['weatherToday', 'todayDatum'],
};
</script>

<style>
.current-weather__container {
  grid-template-columns: 60% 1fr;
  grid-template-rows: 35% 1fr;
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  display: grid;
  overflow: hidden;
}

.current-weather {
  grid-area: 1 / 1 / 3 / 2;

  grid-template-columns: 100%;
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0;
  grid-row-gap: .5rem;
  display: grid;
}

.current-weather__info-items-container {
  align-items: center;
}

.current-date {
  display: inline-block;
}

.current-weather__icon {
  width: 2rem;
  margin-left: 1rem;
}


.current-weather__temperature {
  grid-area: 1 / 2 / 2 / 3;
}

.current-weather__uv-index {
  grid-area: 2 / 2 / 3 / 3;
}


.current-weather__info-items-container,
.current-weather__temperature,
.current-weather__uv-index {
  display: flex;
}


.current-weather,
.current-weather__temperature,
.current-weather__uv-index {
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
}

.info-unit {
  font-size: 1rem;
  margin-left: .2rem;
  font-weight: 600;
}

.current-weather {
  padding-left: 2rem;
}

.current-weather__temperature,
.current-weather__uv-index {
  padding-left: 1.5rem;
}

.info-name {
  font-weight: 300;
  font-size: .8rem;
}

.current-weather__info-items-container:first-child,
.current-weather__temperature>.info__item {
  margin-top: .5rem;
}

.info__item {
  font-weight: 700;
  font-size: 1.8rem;
}

.current-weather__uv-index>.info__item {
  margin: 1rem 0;
}
</style>
