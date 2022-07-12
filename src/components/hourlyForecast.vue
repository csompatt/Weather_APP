<template>
  <section class="hourly-forecast">
    <ul class="hourly-forecast__list">
      <li class="hourly-forecast__list__item" v-for="hour in weatherHourly" :key="hour.time">
        <span class="list__item__time">
          {{ hour.time + ':00' }}
        </span>
        <img class="list__item__icon" :src="hour.icon" alt="Hourly forecast weather icon">
        <span class="list__item__temperature">
          {{ hour.temp }}<span class="list__item__unit"><sup>o</sup>C</span>
        </span>
        <span class="list__item__rain-chance" v-if="hour.rainChance > 0">
          <i class=" rain-chance__icon fa-solid fa-droplet"></i>
          <span>{{ hour.rainChance }}<span class="list__item__unit">%</span></span>
        </span>
      </li>
    </ul>
  </section>

</template>

<script>


export default {
  name: 'hourlyWeather',
  props: ['weatherHourly'],
};

</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.hourly-forecast__list__item,
.list__item__rain-chance {
  align-items: center;
  display: flex;
}

.hourly-forecast__list {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  column-gap: 2rem;
  overflow-x: scroll;
  margin: 0 auto;
  max-width: 90%;
  padding: 0 1rem;
}

.hourly-forecast__list__item {
  flex-direction: column;
  font-weight: 400;
}

.list__item__icon {
  width: 2rem;
}


.list__item__rain-chance {
  margin-top: .3rem;
}

.list__item__unit,
.rain-chance__icon {
  font-size: .6rem;
}

.list__item__unit {
  margin-left: .1rem;
  font-weight: 300;
}

.rain-chance__icon {
  margin-right: .3rem;
}
</style>