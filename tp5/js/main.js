var app;
window.onload = function () {
    app = new Vue({
        el: "#weatherApp",
        data: {
            loaded: false,
            formCityName: "",
            messageForm: "",
            cityList: [{ name: "Paris" }],
            cityWeather: null,
            cityWeatherLoading: false,
        },

        mounted: function () {
            this.loaded = true;
        },

        methods: {

            addCity: function (event) {
                event.preventDefault();

                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = "Cette ville existe déjà !";
                    return;
                }

                this.cityList.push({ name: this.formCityName });
                this.formCityName = "";
                this.messageForm = "";
            },

            isCityExist: function (name) {
                return this.cityList.some(
                    c => c.name.toUpperCase() === name.toUpperCase()
                );
            },

            remove: function (city) {
                this.cityList = this.cityList.filter(c => c.name !== city.name);
            },


            meteo: function (city) {
                this.cityWeatherLoading = true;

                const url =
                    "https://api.openweathermap.org/data/2.5/weather?q="
                    + city.name
                    + "&units=metric&lang=fr&appid=91a329aef52a4c151887431c44298bef";

                fetch(url)
                    .then(res => res.json())
                    .then(json => {
                        this.cityWeatherLoading = false;

                        if (json.cod == 200) {
                            this.cityWeather = json;
                        } else {
                            this.cityWeather = null;
                            alert("Ville introuvable !");
                        }
                    });
            }
        },

        computed: {


            cityWheaterDate: function () {
                if (!this.cityWeather) return "";

                let d = new Date(this.cityWeather.dt * 1000);
                return d.getHours() + ":" +
                    (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
            },


            cityWheaterSunrise: function () {
                if (!this.cityWeather) return "";
                let d = new Date(this.cityWeather.sys.sunrise * 1000);
                return d.toLocaleTimeString("fr-FR").slice(0, 5);
            },


            cityWheaterSunset: function () {
                if (!this.cityWeather) return "";
                let d = new Date(this.cityWeather.sys.sunset * 1000);
                return d.toLocaleTimeString("fr-FR").slice(0, 5);
            },


            openStreetMapArea: function () {
                if (!this.cityWeather) return "";

                const zoom = 8;
                const delta = 0.05 / Math.pow(2, zoom - 10);

                const lat = this.cityWeather.coord.lat;
                const lon = this.cityWeather.coord.lon;

                return `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
            }
        }
    });
};
