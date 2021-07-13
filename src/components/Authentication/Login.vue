<template>
  <div class="login">
    <h3 class="title">Login</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {}
</script>

<style lang="scss">
.login {
  .title {
    text-align: center;
    padding: 2rem;
    font-weight: bold;
  }
}
</style>
