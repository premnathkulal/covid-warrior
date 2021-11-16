<template>
  <div class="news-container">
    <div class="news" v-if="topNewsList && !isLoading">
      <div v-for="(item, index) in topNewsList" :key="index">
        <a
          :href="item.url"
          target="_blank"
          rel="noreferrer"
          class="short-news py-3 text-dark"
        >
          <div class="img-container">
            <img
              v-if="item.multimedia"
              class="img"
              :src="item.multimedia[0].url"
              alt="news-multimedia"
            />
          </div>
          <div class="news-contents">
            <div class="news-title">{{ item.title }}</div>
            <div class="abstract d-none d-sm-block">{{ item.abstract }}</div>
            <div class="news-publish-info d-none d-sm-flex pt-3 mt-auto">
              <div class="date">{{ item.byline }}</div>
              <div class="name ms-auto">
                {{ dateFormate(item.published_date.slice(0, 10)) }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <template v-else-if="!topNewsList || isLoading"><news-loader /></template>
  </div>
</template>

<script lang="ts">
import { newsActions } from '@/types/types'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import NewsLoader from '@/components/Home/page-loaders/NewsLoader.vue'
import { TopNews } from '@/types/interface'
import { dateFormate } from '@/utils/filters'

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
  public topNewsList!: TopNews[]

  @news.Action(newsActions.TOP_NEWS)
  public topNews!: () => void

  created(): void {
    this.topNews()
  }

  dateFormate = dateFormate
}
</script>

<style lang="scss">
.news-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0.8rem;

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
      text-decoration: none;

      .img-container {
        width: 180px;
        height: 150px;
        .img {
          height: 100%;
          width: 100%;
          object-fit: cover;
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
          width: 150px;
          height: 150px;
          background-color: red;
          .img {
            height: 100%;
            width: 100%;
            object-fit: cover;
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
