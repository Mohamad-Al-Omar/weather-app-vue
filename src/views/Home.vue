<template>
  <div class="home">
    <v-container>
      <v-row>
        <div class="title">
          Weather App 
        </div>
        <leaflet-map/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import LeafletMap from '@/components/LeafletMap.vue';

export default {
  name: 'Home',
  components: {
    LeafletMap
  }
}
</script>
