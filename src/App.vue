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
                  <v-list-item-title
                    v-if="userToken"
                    @click.stop="userLogout()"
                  >
                    <span class="btn">Logout</span>
                  </v-list-item-title>
                  <v-list-item-title v-else @click.stop="toggle = true">
                    <span class="btn">Login</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <template v-slot:extension>
            <v-tabs v-model="currentTabName" fixed-tabs slider-color="green">
              <template v-for="item in tabOptions">
                <v-tab class="tab-options" :to="item.to" :key="item.name">
                  <span class="tab-title pr-4 d-none d-sm-block">{{
                    item.name
                  }}</span>
                  <span class="tab-icon">
                    <v-icon :color="item.iconColor" x-large>
                      {{ item.icon }}
                    </v-icon>
                  </span>
                </v-tab>
              </template>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
      <router-view />
    </v-app>
    <transition name="bottom-drawer">
      <div class="bottom-drawer" @click.stop="toggle = true" v-show="toggle">
        <login
          @toggleAuthScreen="authScreen = 'register'"
          @hideAuthScreen="toggle = false"
          v-if="authScreen === 'login'"
        />
        <register
          v-else
          @toggleAuthScreen="authScreen = 'login'"
          @hideAuthScreen="toggle = false"
        />
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
import { LocationActions, LoginActions } from './types/types'
import { Position } from './types/interface'
import { UpdatesActions } from '@/types/types'
import VaccinationCenters from '@/components/vaccination/VaccinationCenters.vue'
import Profile from '@/components/Profile/Profile.vue'

const updates = namespace('Updates')
const location = namespace('Location')
const login = namespace('Login')

@Component({
  components: {
    Login,
    Register,
    Home,
    VaccinationCenters,
    Profile,
  },
})
export default class App extends Vue {
  currentTabName = 'tab-update'
  tabOptions = tabOptions
  drawer = null
  toggle = false
  authScreen = 'login'

  @login.Getter
  userToken!: string

  @login.Action(LoginActions.IS_LOGGED_IN)
  public isUserLoggedIn!: () => void

  @login.Action(LoginActions.LOGOUT)
  public logout!: () => void

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
        // TODO: Error
        this.loadUpdates()
      }
    )
  }

  userLogout(): void {
    this.logout()
    window.location.reload()
  }

  created(): void {
    this.locationTracker()
    this.isUserLoggedIn()
  }
}
</script>

<style lang="scss">
@include pulse-bg();
#app {
  background: $color-background;
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
      text-decoration: none;
      .tab-title {
        color: $black;
      }
      .tab-icon {
        width: 5rem;
      }
    }
    z-index: 1;
  }

  .bottom-drawer {
    z-index: 3;
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
