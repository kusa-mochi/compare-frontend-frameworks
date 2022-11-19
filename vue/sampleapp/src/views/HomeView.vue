<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <zoomable-image :src="require('../assets/test.jpg')" class="image-area" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ZoomableImage from "@/components/ZoomableImage.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    ZoomableImage,
  },
});
</script>

<style lang="scss">
.image-area {
  width: 800px;
  height: 700px;
}
</style>
