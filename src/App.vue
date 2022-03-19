<template>
  <v-app>
    <v-main class="main-view">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.main-view {
  background-color: $dimgray;
}
</style>
