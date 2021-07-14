<template>
  <div id="app" @click="toggle = false">
    <v-app>
      <v-card>
        <v-toolbar class="toolbar primary" color="primary accent-4" dark flat>
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
            <v-tabs v-model="currentItem" fixed-tabs slider-color="green">
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

@Component({
  components: {
    Login,
    Register,
  },
})
export default class App extends Vue {
  currentItem = 'tab-update'
  tabOptions = tabOptions
  drawer = null
  toggle = false
  authScreen = 'login'
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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
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
