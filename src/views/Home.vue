<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h1 text-center font-weight-medium">Weather App</div>
      </v-col>
      <v-col cols="12 mt-5">
        <leaflet-map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "Home",
  components: {
    LeafletMap,
  },
};
</script>
<style lang="scss"></style>
