<template>
  <section class="daily-forecast">
    <div class="daily-forecast__swiper-wrap">
      <swiper class="swiper" :modules="modules" :slides-per-view="1" :pagination="{ clickable: true }">
        <swiper-slide class="swiper__slide" v-for="dailyWeather in dailyForecast" :key="dailyWeather">
          <div class="swiper__slide__item__wrap">
            <div class="slide__item">
              <div class="daily-forecast__infos">
                <p class="daily-forecast__infos__item">
                  {{ dailyWeather.date }}
                </p>
                <p class="daily-forecast__infos__item">
                  {{ dailyWeather.minTemp }}
                  <sup>o</sup>C -
                  {{ dailyWeather.maxTemp }}
                  <sup>o</sup>C
                </p>
                <p class="daily-forecast__infos__item" v-if="dailyWeather.rainChance > 0">
                  Rain chance: {{ dailyWeather.rainChance }}%
                </p>
              </div>
              <div><img :src="dailyWeather.icon" alt="Weekly forecast weather icon.">
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>

// import Swiper core and required modules
import { Pagination } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  props: ['dailyForecast'],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    }
  }
};
</script>

<style scoped>
.daily-forecast {
  max-height: 100%;
}

.daily-forecast__swiper-wrap {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}


.swiper,
.slide-item {
  width: 100%
}

.swiper__slide,
.swiper__slide__item__wrap {
  padding: .5rem;
}

.swiper {
  height: 100%;
}

.slide__item {
  justify-content: space-around;
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
}

.daily-forecast__infos>.daily-forecast__infos__item:not(:nth-child(2)) {
  font-size: .7rem;
}

.daily-forecast__infos>.daily-forecast__infos__item:nth-child(2) {
  margin: .3rem 0;
}
</style>
