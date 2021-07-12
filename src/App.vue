<template>
  <div id="app">
    <flash-screen />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FlashScreen from '@/components/FlashScreen.vue'

@Component({
  components: {
    FlashScreen,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
