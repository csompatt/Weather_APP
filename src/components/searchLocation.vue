<template>
  <section class="search-location">
    <input id="search-input" class="search-location__input" type="text" v-model="searchInput"
      :style="{ width: searchInputWidth ? '80%' : '0' }" placeholder="Search a location...">
    <button class="header__open-search-btn" :style="{ left: searchInputWidth ? '95%' : '1rem' }"
      @click="toggleSearch()">
      <i class="header__open-search-btn-icon fa-solid fa-magnifying-glass-location"></i>
    </button>
    <div class="header__location-container" v-if="showCityName">
      <h1>{{ selectedCity }}</h1>
      <i class="fa-solid fa-location-dot header__location__icon"></i>
    </div>
    <ul class="search-location__suggestion-list">
      <li class="suggestion-list__item" @click="pushCityData(index)" v-for="(city, index) in citiesList" :key="index">
        {{ city.cityListName }}</li>
    </ul>
  </section>
</template >
    
<script>



export default {
  name: 'searchLocation',

  emits: [
    'pushCityData',
    'closeSearch',
    'showCityName'
  ],
  props: [
    'selectedCity'
  ],

  data() {
    return {
      citiesList: [],
      searchInput: '',
      searchInputWidth: false,
      showCityName: true
    }
  },

  watch: {

    searchInputWidth() {

      // If the search inputfield opened, focus, but if closed focusout.

      const searchInputField = document.getElementById("search-input");
      this.searchInputWidth ? searchInputField.focus() : ''
      searchInputField.addEventListener('focusout', () => {
        this.searchInputWidth = false;
      })



      // If inputfield opened hide the city name, but if we close it appear it after 300ms.

      if (this.searchInputWidth) {
        this.showCityName = !this.searchInputWidth;
      } else {
        setTimeout(() => {
          this.showCityName = true;
        }, 300)
      }

      // After we selected the city from the list, wait (pass the daatas) 50ms and null the citiesList and searchInput.

      if (this.searchInputWidth === false) {
        setTimeout(() => {
          this.citiesList = [];
          this.searchInput = '';
        }, 50)

      }

    },

    // If the search inputfield value changed and the length is more than 2 fetch the autocomplete api.

    searchInput() {

      this.citiesList = [];

      if (this.searchInput.length > 2) {
        fetch('https://api.locationiq.com/v1/autocomplete?key=pk.c92bde9b8fe296c7217ce940e120f424&q=' + this.searchInput + '&limit=5&dedupe=1')
          .then(response => response.json())
          .then(data => {

            for (let i = 0; data.length > i; i++) {

              let cityData = data[i];

              let cityObject = {
                cityName: cityData.display_place,
                cityListName: cityData.display_name,
                latitude: cityData.lat,
                longitude: cityData.lon
              }
              this.citiesList.push(cityObject);
            }
          })
      }



    },
  },

  methods: {
    closeSearch() {
      this.$emit('closeSearch');
    },
    toggleSearch() {
      this.searchInputWidth = !this.searchInputWidth;
      this.$emit('showCityName');
    },

    pushCityData(index) {
      let city = this.citiesList[index];
      this.$emit('pushCityData', city.cityName, city.latitude, city.longitude);
      this.citiesList = [];
      this.searchInput = '';
    }
  }
}
</script>

 
<style scoped>
.header__location-container,
.search-location {
  display: flex;
}

.header__open-search-btn,
.search-location__suggestion-list {
  position: absolute;
}

.search-location,
.search-location__suggestion-list {
  width: 100%;
}

.search-location__input,
.header__open-search-btn {
  transition: all .4s ease-in-out;
}

.search-location {
  position: relative;
  justify-content: space-between;
}

.search-location__input {
  border-bottom: 1px solid #fff;
  border-radius: 0;
  outline: none;
  background: none;
  font-size: 1.2rem;
}

.search-location__input::placeholder {
  color: rgba(255, 255, 255, .3);
}

.header__open-search-btn {
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
}

.header__location-container {
  align-items: center;
  margin-left: auto;
}

.header__location__icon {
  margin-left: .5rem;
}

.search-location__suggestion-list {
  top: 0;
  z-index: 500;
  text-align: center;
  overflow: scroll;
  margin-top: 3.5rem;
  border-radius: 2rem;
  max-height: 40vh;
  background: rgba(255, 255, 255, .4);
  backdrop-filter: blur(4px);
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

.suggestion-list__item {
  margin-top: 2rem;
  text-shadow: 2px 2px rgba(0, 0, 0, .6);
}
</style>
