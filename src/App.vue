<template>
  <div id="app">
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
            ></lottie-player>
          </div>

          <v-spacer></v-spacer>

          <div class="text-center">
            <v-menu>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-btn
                  color="black"
                  dark
                  v-bind="attrs"
                  v-on="{ ...menu }"
                  icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <template v-slot:extension>
            <v-tabs v-model="currentItem" fixed-tabs slider-color="white">
              <v-tab v-for="item in tabOptions" :key="item.name">
                <span class="tab-title pr-4 d-none d-sm-block"
                  >{{ item.name }}
                </span>
                <span class="tab-icon"
                  ><v-icon :color="item.iconColor" x-large>{{
                    item.icon
                  }}</v-icon></span
                >
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  currentItem = 'tab-Web'
  tabOptions = [
    { name: 'Updates', icon: 'mdi-fire', iconColor: 'red' },
    { name: 'Vaccination', icon: 'mdi-needle', iconColor: 'blue' },
    { name: 'Profile', icon: 'mdi-account', iconColor: 'green' },
  ]
  text = 'Hello, World.'

  drawer = null
  itemees = [
    { title: 'Home', icon: 'mdi-view-dashboard' },
    { title: 'About', icon: 'mdi-forum' },
  ]
}
</script>

<style lang="scss">
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
  .tab-title {
    color: $black;
  }
  .tab-icon {
    width: 5rem;
  }
}
</style>
