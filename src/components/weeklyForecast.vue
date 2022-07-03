<template>
  <section class="weekly-forecast">
    <div class="weekly-forecast__swiper-wrap">
      <swiper class="swiper" :modules="modules" :slides-per-view="1" :pagination="{ clickable: true }"
        @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide class="swiper__slide" v-for="dailyWeather in dailyForecast" :key="dailyWeather">
          <div class="swiper__slide__item__wrap">
            <div class="slide__item">
              <div class="weekly-forecast__infos">
                <p class="weekly-forecast__infos__item">
                  {{ dailyWeather.date }}
                </p>
                <p class="weekly-forecast__infos__item">
                  {{ dailyWeather.minTemp }}
                  <sup>o</sup>C -
                  {{ dailyWeather.maxTemp }}
                  <sup>o</sup>C
                </p>
                <p class="weekly-forecast__infos__item" v-if="dailyWeather.rainChance > 0">
                  Rain chance: {{ dailyWeather.rainChance }}%
                </p>
              </div>
              <div class="weekly-forecast__icon"><img :src="dailyWeather.icon" alt="Weekly forecast weather icon.">
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
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination],
    }
  }
};
</script>

<style scoped>
.weekly-forecast {
  max-height: 100%;
}

.weekly-forecast__swiper-wrap {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper__slide,
.swiper__slide__item__wrap {
  padding: .5rem;
}

.slide__item {
  justify-content: space-around;
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
}

.weekly-forecast__infos>.weekly-forecast__infos__item:not(:nth-child(2)) {
  font-size: .7rem;
}

.weekly-forecast__infos>.weekly-forecast__infos__item:nth-child(2) {
  margin: .3rem 0;
}
</style>
