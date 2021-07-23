<template>
  <div class="news-container">
    <div class="news" v-if="topNewsList && !isLoading">
      <template v-for="(item, index) in topNewsList">
        <div :key="index">
          <a
            :href="item.url"
            target="_blank"
            class="short-news py-3 text-dark text-decoration-none"
          >
            <div class="image"><img :src="item.multimedia[0].url" /></div>
            <div class="news-contents">
              <div class="news-title">{{ item.title }}</div>
              <div class="abstract d-none d-sm-block">{{ item.abstract }}</div>
              <div class="news-publish-info d-none d-sm-flex pt-3 mt-auto">
                <div class="date">{{ item.byline }}</div>
                <div class="name ms-auto">
                  {{ item.published_date.slice(0, 10) }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </template>
    </div>
    <template v-else-if="!topNewsList || isLoading"><news-loader /></template>
  </div>
</template>

<script lang="ts">
import { newsActions } from '@/types/types'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import NewsLoader from '@/components/Home/page-loaders/NewsLoader.vue'

const news = namespace('News')

@Component({
  components: {
    NewsLoader,
  },
})
export default class News extends Vue {
  @news.State
  public isLoading!: boolean

  @news.Getter
  public topNewsList!: string

  @news.Action(newsActions.TOP_NEWS)
  public topNews!: () => void

  created(): void {
    this.topNews()
  }
}
</script>

<style lang="scss">
.news-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .news {
    width: 80%;
    @media only screen and (max-width: 1400px) {
      width: 100%;
    }
    .short-news {
      display: flex;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: $white;
      margin-bottom: 0.8rem;
      cursor: pointer;
      .image {
        img {
          width: 15rem;
          height: 10rem;
        }
      }
      .news-contents {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        .news-title {
          font-weight: bold;
          font-size: 1.2rem;
          padding-bottom: 1rem;
        }
        .abstract {
          font-size: 1rem;
        }
        .news-publish-info {
          display: flex;
          opacity: 0.7;
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
          .news-title {
            font-size: 1rem !important;
          }
        }
      }
      &:hover {
        box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.09);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
