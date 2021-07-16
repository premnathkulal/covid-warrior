import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { topStoriesAPI } from '@/utils/api'
import { newsActions, newsMutations } from '@/types/types'

@Module({ namespaced: true })
class News extends VuexModule {
  isLoading = false
  topNews = []

  @Mutation
  public [newsMutations.TOP_NEWS](data: any): void {
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

  get topNewsList(): any {
    return this.topNews
  }
}
export default News
