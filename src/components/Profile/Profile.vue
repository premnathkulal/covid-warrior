<template>
  <div class="profile-page">
    <div class="profile-card container d-block">
      <div class="profile-img">
        <v-icon class="profile-img-placeholder">mdi-account-circle</v-icon>
      </div>
      <div class="profile-info">
        <div class="iserId">ondjhdhgjhgh1234</div>
        <div class="username">username</div>
        <div class="name">Name Name</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Profile extends Vue {}
</script>

<style lang="scss">
.profile-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-background;

  .profile-card {
    margin: 1rem;
    background: $white;
    border-radius: 0.5rem;
    box-shadow: 0 1rem 1rem rgb(230, 230, 230);

    .profile-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .profile-img-placeholder {
        font-size: 8rem;
      }
    }
    .profile-info {
      width: 100%;
      padding: 0.8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 2.7rem;
      font-weight: bold;
      font-size: 1.3rem;
    }
  }
}
</style>
