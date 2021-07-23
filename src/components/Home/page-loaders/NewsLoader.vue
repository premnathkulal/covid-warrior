<template>
  <div class="news-loader">
    <template v-for="(item, index) in 4">
      <div :key="index" class="short-news py-3">
        <div class="image"><div class="img"></div></div>
        <div class="news-contents">
          <div class="title"></div>
          <div class="abstract"></div>
          <div class="abstract small-abstract d-none d-sm-block mt-2"></div>
          <div class="news-publish-info d-none d-sm-flex pt-3 mt-auto">
            <div class="name"></div>
            <div class="date ms-auto"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NewsLoader extends Vue {}
</script>

<style lang="scss">
.news-loader {
  width: 80%;
  @media only screen and (max-width: 1400px) {
    width: 100%;
  }

  .short-news {
    display: flex;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.8rem;
    cursor: pointer;
    background: $gray-background;

    .image {
      .img {
        width: 10rem;
        height: 10rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
    }
    .news-contents {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 1rem;

      .title {
        margin-bottom: 1rem;
        width: 15rem;
        height: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
      .abstract {
        width: 34rem;
        height: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
      .small-abstract {
        width: 24rem;
        height: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
      .news-publish-info {
        display: flex;
        .name {
          width: 8rem;
          height: 1rem;
          background: $dark-gray;
          animation: pulse-bg 1.5s infinite;
        }
        .date {
          width: 8rem;
          height: 1rem;
          background: $dark-gray;
          animation: pulse-bg 1.5s infinite;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .image {
        img {
          width: 10rem;
          height: 8rem;
        }
      }
      .news-contents {
        .title {
          width: 10rem;
          height: 1rem;
          background: $dark-gray;
        }
        .abstract {
          width: 6rem;
          height: 1rem;
          background: $dark-gray;
          animation: pulse-bg 1.5s infinite;
        }
      }
    }
    &:hover {
      box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.09);
      transition: all 0.3s ease;
    }
  }
}
</style>
