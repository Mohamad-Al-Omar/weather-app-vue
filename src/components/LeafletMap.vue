<template>
  <div style="height: 500px; width: 100%">
    <l-map
      v-if="showMap"
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @ready="onMapReady"
      @locationfound="onLocationFound"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @click="addMarker"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-control position="topleft">
        <v-btn @click="clickHandler" class="pa-1" style="min-width: 24px">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </l-control>
      <l-marker
        ref="marker"
        :lat-lng="markerLatLng"
        v-if="showMarker"
        @ready="onMarkerReady"
      >
        <l-popup ref="popup">
          <v-list class="pa-0">
            <v-list-item three-line class="pa-0">
              <v-list-item-content>
                <v-list-item-title class="mb-1 text-wrap">
                  <strong>City:</strong> {{ cityName }}
                </v-list-item-title>
                <v-list-item-title class="text-wrap">
                  <strong>Country:</strong> {{ countryName }}
                </v-list-item-title>
                <v-list-item-title class="text-wrap">
                  <strong>Weather:</strong> {{ weather }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl,
  },
  data() {
    return {
      map: null,
      marker: null,
      popup: null,
      zoom: 12,
      center: latLng(25.253390580642623, 55.29796600341797),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: latLng(47.41422, -1.250482),
      currentZoom: 13,
      currentCenter: latLng(25.253390580642623, 55.29796600341797),
      showMarker: false,
      userLocation: "",
      cityName: "",
      countryName: "",
      weather: "",
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.popup.openPopup();
    });
  },
  methods: {
    clickHandler() {
      this.map.panTo(this.userLocation);
    },
    onMapReady(mapObject) {
      mapObject.locate();
      this.map = mapObject;
    },
    onMarkerReady(mapObject) {
      this.marker = mapObject;
    },
    onLocationFound(location) {
      this.userLocation = location.latlng;
      this.map.panTo(this.userLocation);
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    addMarker(event) {
      this.showMarker = true;
      const latlng = event.latlng;
      const lat = latlng.lat;
      const lng = latlng.lng;
      console.log(lat, lng);
      this.markerLatLng = latLng(lat, lng);
      const locationApi =
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        lat +
        "&lon=" +
        lng;
      const weatherApi =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lng +
        "&appid=c50004d24015a979a7e5a7e84355b95d&units=metric";
      this.$http
        .get(locationApi)
        .then((response) => {
          console.log(response);
          if (response.data.error !== undefined) {
            this.cityName = "";
            this.countryName = "";
            this.weather = "";
            return;
          } else {
            this.cityName = response.data.address.city;
            this.countryName = response.data.address.country;
          }
          this.cityName = response.data.address.state;
          this.countryName = response.data.address.country;
          this.$http
            .get(weatherApi)
            .then((response) => {
              console.log(response);
              this.weather = response.data.main.temp;
              console.log(this.marker);
              this.marker.openPopup();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
