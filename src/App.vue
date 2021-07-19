<template>
  <div id="app" @click="toggle = false">
    <v-app>
      <v-card :elevation="0">
        <v-toolbar
          class="toolbar primary fixed-top"
          color="primary accent-4"
          dark
          flat
        >
          <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
          <div class="toolbar-title">
            Covid Warrior
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="/assets/lotties/corona-virus.json"
              style="width: 50px"
              background="transparent"
            >
            </lottie-player>
          </div>

          <v-spacer></v-spacer>

          <div class="text-center">
            <v-menu>
              <template v-slot:activator="{ on: menu }">
                <v-btn color="black" v-on="{ ...menu }" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title @click.stop="toggle = true">
                    <span class="btn">Login</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <template v-slot:extension>
            <v-tabs v-model="currentTabName" fixed-tabs slider-color="green">
              <v-tab
                class="tab-options"
                v-for="item in tabOptions"
                :key="item.name"
              >
                <span class="tab-title pr-4 d-none d-sm-block"
                  >{{ item.name }}
                </span>
                <span class="tab-icon">
                  <v-icon :color="item.iconColor" x-large>
                    {{ item.icon }}
                  </v-icon>
                </span>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items
          class="tab-items elevation-0"
          content-class="elevation-0"
          v-model="currentTabName"
          touchless
        >
          <v-tab-item content-class="elevation-0">
            <home />
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <home />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <home />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <!-- <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    </v-app>

    <transition name="bottom-drawer">
      <div class="bottom-drawer" @click.stop="toggle = true" v-show="toggle">
        <login
          @toggleAuthScreen="authScreen = 'register'"
          v-if="authScreen === 'login'"
        />
        <register @toggleAuthScreen="authScreen = 'login'" v-else />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Login from '@/components/Authentication/Login.vue'
import Register from '@/components/Authentication/Register.vue'
import { tabOptions } from '@/utils/uiData'
import Home from '@/components/Home/Home.vue'
import { namespace } from 'vuex-class'
import { LocationActions } from './types/types'
import { Position } from './types/interface'
import { UpdatesActions } from '@/types/types'

const updates = namespace('Updates')
const location = namespace('Location')

@Component({
  components: {
    Login,
    Register,
    Home,
  },
})
export default class App extends Vue {
  currentTabName = 'tab-update'
  tabOptions = tabOptions
  drawer = null
  toggle = false
  authScreen = 'login'

  @location.Action(LocationActions.ADDRESS)
  // eslint-disable-next-line no-unused-vars
  public loadAdress!: (position: Position) => void

  @updates.Action(UpdatesActions.UPDATES)
  public loadUpdates!: () => void

  locationTracker(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.loadAdress({ lat: latitude, lon: longitude })
        this.loadUpdates()
      },
      () => {
        // Error
        this.loadUpdates()
      }
    )
  }

  created(): void {
    this.locationTracker()
  }
}
</script>

<style lang="scss">
#app {
  .toolbar {
    .toolbar-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: $combo;
      font-weight: bold;
      font-size: 2rem;
      color: $black;
      padding-top: 1rem;
      margin-left: 2.5rem;
    }
    .tab-options {
      .tab-title {
        color: $black;
      }
      .tab-icon {
        width: 5rem;
      }
    }
  }

  .bottom-drawer {
    z-index: 2;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 79%;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    background: $theme-gradient;
  }

  .bottom-drawer-enter,
  .bottom-drawer-leave-to {
    visibility: hidden;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  .bottom-drawer-enter-active,
  .bottom-drawer-leave-active {
    transition: all 0.5s;
  }
}
</style>
