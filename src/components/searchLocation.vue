<template>
  <section class="search-location" :style="{ justifyContent: searchInputWidth ? 'space-between' : 'flex-start' }">
    <input id="search-input" class="search-location__input" type="text" v-model="searchInput"
      :style="{ width: searchInputWidth ? '80%' : '0' }" placeholder="Search a location...">
    <button class="header__open-search-btn" :class="(searchInputWidth) ? 'anime' : 'anime-back'"
      :style="{ left: searchInputWidth ? '95%' : '1rem' }" @click="toggleSearch()">
      <i class="header__open-search-btn-icon fa-solid fa-magnifying-glass-location"></i>
    </button>
    <div class="header__location-container" v-if="showCityName">
      <h1 class="header__location__city-name" v-if="selectedCity">{{ selectedCity }}</h1>
      <i class="fa-solid fa-location-dot header__location__icon"></i>
    </div>
    <ul class="search-location__suggestion-list">
      <li class="suggestion-list__item" @click="pushCityData(city.cityName, city.latitude, city.longitude)"
        v-for="(city, index) in citiesList" :key="index"> {{ city.cityListName }}</li>
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
      cities: [],
      citiesList: [],
      searchInput: '',
      searchInputWidth: false,
      showCityName: true
    }
  },

  watch: {

    searchInputWidth() {
      const searchInputField = document.getElementById("search-input");
      this.searchInputWidth ? searchInputField.focus() : searchInputField.focus()
      searchInputField.addEventListener('focusout', () => {
        this.searchInputWidth = false;
      })

      if (this.searchInputWidth) {
        this.showCityName = !this.searchInputWidth;
      } else {
        setTimeout(() => {
          this.showCityName = true;
        }, 300)
      }


      if (this.searchInputWidth === false) {
        setTimeout(() => {
          this.citiesList = [];
          this.searchInput = '';
        }, 50)

      }

    },
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
    selectedCity() {
      if (this.selectedCity) {
        this.searchInputWidth = false;
      }
      return this.selectedCity;
    }
  },

  methods: {

    closeSearch() {
      this.$emit('closeSearch');
    },
    toggleSearch() {
      this.searchInputWidth = !this.searchInputWidth;
      this.$emit('showCityName');
    },

    pushCityData(city, latitude, longitude) {
      this.$emit('pushCityData', city, latitude, longitude);
      this.citiesList = [];
      this.searchInput = '';
    }
  }
}
</script>

 
<style scoped>
.search-location__input {
  transition: all .4s ease-in-out;
  border-bottom: 1px solid #fff;
  outline: none;
  border-radius: 0;
  background: none;
  font-size: 1.2rem;

}

.search-location__input::placeholder {
  color: #fff;
}

.header__open-search-btn {
  font-size: 1.5rem;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  transition: all .4s ease-in-out;
}

.header__location__icon {
  margin-left: .5rem;
}

.header__location-container {
  margin-left: auto;
  display: flex;
  align-items: center;

}



.search-location {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
}




.search-location__suggestion-list {
  position: absolute;
  top: 0;
  margin-top: 3.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2rem;
  width: 100%;
  max-height: 40vh;
  overflow: scroll;
  text-align: center;
  background: rgba(255, 255, 255, .2);
  backdrop-filter: blur(4px);
  border-radius: 2rem;
  z-index: 500;

}

.suggestion-list__item {
  margin-top: 2rem;

}
</style>
