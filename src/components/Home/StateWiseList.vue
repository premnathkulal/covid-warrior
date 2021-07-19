<template>
  <div class="states-list">
    <div
      v-if="currentStateUpdates && !isLoading && !loading"
      class="statewise-information mb-5"
    >
      <div class="state-header">
        <p class="state-title">
          {{ currentStateUpdates.state }}
          <span
            v-if="address.countrySubdivision === currentStateUpdates.state"
            class="address pl-5"
            >{{ address.freeformAddress }}</span
          >
        </p>
        <img
          class="state-map ml-auto"
          :src="`/assets/states/${currentStateUpdates.statecode}.png`"
          :alt="currentStateUpdates.statecode"
        />
      </div>
      <div class="data-field py-5">
        <div class="display-data">
          <p class="data-title">Confirmed</p>
          <p class="data-count">{{ currentStateUpdates.confirmed }}</p>
        </div>
        <div class="display-data">
          <p class="data-title text-danger">Active</p>
          <p class="data-count">{{ currentStateUpdates.active }}</p>
        </div>
        <div class="display-data">
          <p class="data-title text-success">Recovered</p>
          <p class="data-count">{{ currentStateUpdates.recovered }}</p>
        </div>
        <div class="display-data">
          <p class="data-title text-danger">Deaths</p>
          <p class="data-count">{{ currentStateUpdates.deaths }}</p>
        </div>
      </div>
      <div class="delta-updates pr-4">
        <div class="delta-header">
          <p class="delta-title">Delta Plus Variant Updates</p>
          <lottie-player
            class="lottie-player"
            autoplay
            loop
            mode="normal"
            :src="`/assets/lotties/delta-anim.json`"
            :style="`width: 80px`"
            background="transparent"
          >
          </lottie-player>
        </div>
        <div class="delta">
          <div class="delta-data">
            <p class="data-title pr-5">Confirmed</p>
            <p class="data-count">{{ currentStateUpdates.deltaconfirmed }}</p>
          </div>
          <div class="delta-data">
            <p class="data-title pr-5 text-success">Recovered</p>
            <p class="data-count">{{ currentStateUpdates.deltarecovered }}</p>
          </div>
          <div class="delta-data">
            <p class="data-title pr-5 text-danger">Deaths</p>
            <p class="data-count">{{ currentStateUpdates.deltadeaths }}</p>
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="isLoading || currentStateUpdates || loading">
      <state-wise-list-loader />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Address, StateWiseUpdates } from '@/types/interface'
import NationalUpdates from '@/components/Home/OverallUpdates.vue'
import StateWiseListLoader from '@/components/Home/StateWiseListLoader.vue'
import { namespace } from 'vuex-class'

const updates = namespace('Updates')

@Component({
  components: {
    NationalUpdates,
    StateWiseListLoader,
  },
})
export default class StateWiseList extends Vue {
  @Prop({ default: null }) stateWiseUpdates!: StateWiseUpdates[]
  @Prop({ default: null }) address!: Address

  @updates.State
  public isLoading!: boolean

  loading = false

  currentStateUpdates: StateWiseUpdates = {
    active: '',
    confirmed: '',
    deaths: '',
    deltaconfirmed: '',
    deltadeaths: '',
    deltarecovered: '',
    lastupdatedtime: '',
    migratedother: '',
    recovered: '',
    state: '',
    statecode: '',
    statenotes: '',
  }

  @Watch('stateWiseUpdates')
  async updateData(): Promise<void> {
    this.loading = true
    this.currentStateUpdates = await this.stateWiseUpdates.filter(data => {
      if (this.address.countrySubdivision === data.state) {
        return true
      }
    })[0]
    this.loading = false
  }
}
</script>

<style lang="scss">
.states-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.5rem;
  color: $text-color;

  .statewise-information {
    background: $light-gray-gradient;
    width: 80%;
    @media only screen and (max-width: 1400px) {
      width: 100%;
    }
    border-radius: 0.8rem;
    padding: 1rem;

    .state-header {
      display: flex;

      .state-title {
        font-weight: bold;
        font-size: 1.4rem;
        padding: 0.5rem;

        .address {
          font-size: 0.8rem;
        }
      }

      .state-map {
        width: 3rem;
        height: 3rem;
      }
    }

    .data-field {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-weight: bold;

      .display-data {
        .data-title {
          font-size: 1rem;
          line-height: 10px;
        }
        .data-count {
          line-height: 5px;
        }
      }
    }

    .delta-updates {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: bold;
      background: $light-red-gradient;
      border-radius: 0.5rem;
      padding: 0.5rem;
      padding-top: 1.5rem;

      .delta-header {
        display: flex;
        justify-content: center;
        font-size: 1.3rem;
        border-radius: 0.5rem;
        height: 5rem;

        .delta-title {
          padding: 0.5rem;
        }

        .lottie-player {
          position: relative;
          top: -1rem;
        }
      }
      .delta {
        display: flex;
        flex-direction: column;
        align-self: center;

        .delta-data {
          display: flex;

          .data-title {
            text-align: left;
            width: 8rem;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
