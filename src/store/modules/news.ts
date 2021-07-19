import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { topStoriesAPI } from '@/utils/api'
import { newsActions, newsMutations } from '@/types/types'
import { TopNews } from '@/types/interface'

@Module({ namespaced: true })
class News extends VuexModule {
  isLoading = false
  topNews: TopNews[] = [
    {
      section: '',
      title: '',
      url: '',
      byline: '',
      published_date: '',
      multimedia: [{ url: '' }],
    },
  ]

  @Mutation
  public [newsMutations.TOP_NEWS](data: TopNews[]): void {
    this.topNews = data
  }

  @Mutation
  public [newsMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Action
  [newsActions.TOP_NEWS](): Promise<void> {
    this.context.commit(newsMutations.LOADING)
    return topStoriesAPI()
      .then(response => {
        this.context.commit(newsMutations.TOP_NEWS, response.data.results)
      })
      .finally(() => {
        this.context.commit(newsMutations.LOADING)
      })
  }

  get topNewsList(): TopNews[] {
    console.log(this.topNews[0])
    return this.topNews
  }
}
export default News
