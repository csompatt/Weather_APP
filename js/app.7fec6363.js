(function(){"use strict";var e={300:function(e,t,n){var r=n(963),a=n(252),o=n(577);const i=e=>((0,a.dD)("data-v-f0695b20"),e=e(),(0,a.Cn)(),e),c={class:"app-layout"},s={class:"header"},u={class:"forecast"},l=i((()=>(0,a._)("span",{class:"toggle-forecast-btn__separate-line"}," | ",-1)));function h(e,t,n,r,i,h){const d=(0,a.up)("search-location"),f=(0,a.up)("current-weather"),p=(0,a.up)("hourly-weather"),y=(0,a.up)("daily-forecast");return(0,a.wg)(),(0,a.iD)("div",c,[(0,a._)("header",s,[(0,a.Wm)(d,{onPushCityData:h.getWeather,"selected-city":i.city,onShowCityName:h.showCity},null,8,["onPushCityData","selected-city","onShowCityName"])]),(0,a.Wm)(f,{"weather-today":i.weatherNow,"months-array":i.months,onClick:h.focusOut},null,8,["weather-today","months-array","onClick"]),(0,a._)("section",u,[(0,a._)("button",{class:"forecast__toggle-forecast-btn",onClick:t[0]||(t[0]=(...e)=>h.toggleForecast&&h.toggleForecast(...e))},[(0,a._)("span",{class:(0,o.C_)(i.dailyAndHourlyForecastSwitcher?"highlight":"")},"Today",2),l,(0,a._)("span",{class:(0,o.C_)(i.dailyAndHourlyForecastSwitcher?"":"highlight")},"Next 7 Days",2)]),i.dailyAndHourlyForecastSwitcher?((0,a.wg)(),(0,a.j4)(p,{key:0,"weather-hourly":i.hourlyWeather},null,8,["weather-hourly"])):(0,a.kq)("",!0),i.dailyAndHourlyForecastSwitcher?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(y,{key:1,"daily-forecast":this.dailyForecast},null,8,["daily-forecast"]))])])}const d={class:"current-weather__container"},f={class:"current-weather"},p={class:"current-weather__info-container"},y={class:"current-weather__info-items-container"},m={class:"current-date"},w=["src"],g={class:"info__item"},_={class:"current-weather__info-container"},v=(0,a._)("h4",{class:"info-name"},"Humidity",-1),b={class:"info__item"},C=(0,a._)("span",{class:"info-unit"},"%",-1),k={class:"current-weather__info-container"},T=(0,a._)("h4",{class:"info-name"},"Wind",-1),F={class:"info__item"},A=(0,a._)("span",{class:"info-unit"},"km/h",-1),D={class:"current-weather__info-container"},S=(0,a._)("h4",{class:"info-name"},"Air Quality",-1),j={class:"info__item"},O={class:"current-weather__temperature"},x=(0,a._)("h4",{class:"info-name"},"Temperature",-1),N={class:"info__item"},M=(0,a._)("span",{class:"info-unit"},[(0,a._)("sup",null,"o"),(0,a.Uk)("C")],-1),W={class:"current-weather__uv-index"},P=(0,a._)("h4",{class:"info-name"},"UV-Index",-1),E={class:"info__item"},H={class:"info-name"};function q(e,t,n,r,i,c){return(0,a.wg)(),(0,a.iD)("article",d,[(0,a._)("section",f,[(0,a._)("div",p,[(0,a._)("div",y,[(0,a._)("h4",m,(0,o.zw)(c.todayDatum),1),(0,a._)("img",{class:"current-weather__icon",src:n.weatherToday.icon,alt:"Current weather icon"},null,8,w)]),(0,a._)("h2",g,(0,o.zw)(n.weatherToday.text),1)]),(0,a._)("div",_,[v,(0,a._)("h2",b,[(0,a.Uk)((0,o.zw)(n.weatherToday.humidity),1),C])]),(0,a._)("div",k,[T,(0,a._)("h2",F,[(0,a.Uk)((0,o.zw)(n.weatherToday.wind),1),A])]),(0,a._)("div",D,[S,(0,a._)("h2",j,(0,o.zw)(n.weatherToday.airQuality),1)])]),(0,a._)("section",O,[x,(0,a._)("h2",N,[(0,a.Uk)((0,o.zw)(n.weatherToday.temp),1),M])]),(0,a._)("section",W,[P,(0,a._)("h2",E,(0,o.zw)(n.weatherToday.uvi),1),(0,a._)("h4",H,(0,o.zw)(n.weatherToday.uviText),1)])])}var z={name:"currentWeather",props:["weatherToday","monthsArray"],computed:{todayDatum(){return this.monthsArray[(new Date).getMonth()]+", "+(new Date).getDate()}}},L=n(744);const U=(0,L.Z)(z,[["render",q]]);var I=U,B={name:"App",components:{searchLocation:(0,a.RC)((()=>n.e(186).then(n.bind(n,186)))),dailyForecast:(0,a.RC)((()=>n.e(550).then(n.bind(n,550)))),hourlyWeather:(0,a.RC)((()=>n.e(987).then(n.bind(n,987)))),currentWeather:I},data(){return{todayDate:"",city:"",cityDisplay:!1,dailyAndHourlyForecastSwitcher:!0,weatherNow:{},hourlyWeather:[],dailyForecast:[],months:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]}},mounted(){const e=this;let t;function n(n){t=n,fetch("https://locationiq.com/v1/reverse?key=pk.c92bde9b8fe296c7217ce940e120f424&lat="+t.coords.latitude+"&lon="+t.coords.longitude+"&format=json").then((e=>e.json())).then((n=>{const r=n.address.town;e.getWeather(r,t.coords.latitude,t.coords.longitude),e.city=r}))}function r(){alert("We can't recognize your location, please use manual searching.")}navigator.geolocation.getCurrentPosition(n,r)},methods:{focusOut(){this.isInputFocus=!1},showCity(){this.cityDisplay=!1},getWeather(e,t,n){this.city=e,this.cityDisplay=!this.cityDisplay,fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+t+"&lon="+n+"&exclude=minutely&units=metric&appid=171b9f9ea8f2cc3e669f62c7264f0397").then((e=>e.json())).then((e=>{fetch("https://api.openweathermap.org/data/2.5/air_pollution?lat="+t+"&lon="+n+"&appid=171b9f9ea8f2cc3e669f62c7264f0397").then((e=>e.json())).then((e=>{const t=["Good","Fair","Moderate","Poor","Very Poor"],n=t[e.list[0].main.aqi];this.weatherNow["airQuality"]=n}));const r=e=>e<=2?"No protection required":e>=3&&e<=7?"Protection required":"Extra protection required",a=e.current;this.weatherNow={text:a.weather[0].main,icon:"https://openweathermap.org/img/wn/"+a.weather[0].icon+".png",temp:Math.round(a.temp),uvi:Math.round(a.uvi),uviText:r(a.uvi),wind:Math.round(3.6*a.wind_speed),humidity:a.humidity},this.hourlyWeather=[];const o=e=>new Date(1e3*e);for(let t=0;24>t;t++){const n=e.hourly[t],r={time:o(n.dt).getHours(),icon:"https://openweathermap.org/img/wn/"+n.weather[0].icon+".png",rainChance:Math.round(100*n.pop),temp:Math.round(n.temp)};this.hourlyWeather.push(r)}this.dailyForecast=[];for(let t=1;e.daily.length>t;t++){const n=e.daily[t],r=o(n.dt),a={date:r.getFullYear()+" - "+this.months[r.getMonth()]+" - "+(r.getDate()-1),icon:"https://openweathermap.org/img/wn/"+n.weather[0].icon+".png",rainChance:Math.floor(100*n.pop),maxTemp:Math.round(n.temp.max),minTemp:Math.round(n.temp.min)};this.dailyForecast.push(a)}}))},toggleForecast(){this.dailyAndHourlyForecastSwitcher=!this.dailyAndHourlyForecastSwitcher}}};const J=(0,L.Z)(B,[["render",h],["__scopeId","data-v-f0695b20"]]);var Q=J;(0,r.ri)(Q).mount("#app")}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,a,o){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],a=e[l][1],o=e[l][2];for(var c=!0,s=0;s<r.length;s++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(c=!1,o<i&&(i=o));if(c){e.splice(l--,1);var u=a();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,a,o]}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{186:"000174bd",550:"779b31a5",987:"ea05c674"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{186:"52612a9a",550:"2e722723",987:"953eaeda"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="weather_app:";n.l=function(r,a,o,i){if(e[r])e[r].push(a);else{var c,s;if(void 0!==o)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var h=u[l];if(h.getAttribute("src")==r||h.getAttribute("data-webpack")==t+o){c=h;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+o),c.src=r),e[r]=[a];var d=function(t,n){c.onerror=c.onload=null,clearTimeout(f);var a=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),a&&a.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/weather_app/"}(),function(){var e=function(e,t,n,r){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var o=function(o){if(a.onerror=a.onload=null,"load"===o.type)n();else{var i=o&&("load"===o.type?"missing":o.type),c=o&&o.target&&o.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=c,a.parentNode.removeChild(a),r(s)}};return a.onerror=a.onload=o,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var a=n[r],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===t))return a}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){a=i[r],o=a.getAttribute("data-href");if(o===e||o===t)return a}},r=function(r){return new Promise((function(a,o){var i=n.miniCssF(r),c=n.p+i;if(t(i,c))return a();e(r,c,a,o)}))},a={143:0};n.f.miniCss=function(e,t){var n={186:1,550:1,987:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=r(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)r.push(a[2]);else{var o=new Promise((function(n,r){a=e[t]=[n,r]}));r.push(a[2]=o);var i=n.p+n.u(t),c=new Error,s=function(r){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,a[1](c)}};n.l(i,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,o,i=r[0],c=r[1],s=r[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(s)var l=s(n)}for(t&&t(r);u<i.length;u++)o=i[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(l)},r=self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(300)}));r=n.O(r)})();
//# sourceMappingURL=app.7fec6363.js.map