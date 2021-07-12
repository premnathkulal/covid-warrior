<template>
  <v-app>
    <v-card>
      <v-toolbar class="toolbar" color="deep-purple accent-4" dark flat>
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

        <v-toolbar-title class="toolbar-title">Covid Warrior</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="currentItem" fixed-tabs slider-color="white">
            <v-tab v-for="item in itemes" :key="item" :href="'#tab-' + item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="currentItem">
        <v-tab-item
          v-for="item in items.concat(more)"
          :key="item"
          :value="'tab-' + item"
        >
          <v-card flat>
            <v-card-text>
              <h2>{{ item }}</h2>
              {{ text }}
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  currentItem = 'tab-Web'
  itemes = ['Home', 'My Beneficiaries', 'Profile']
  text = 'Hello, World.'

  drawer = null
  items = [
    { title: 'Home', icon: 'mdi-view-dashboard' },
    { title: 'About', icon: 'mdi-forum' },
  ]
}
</script>

<style lang="scss">
.toolbar {
  .toolbar-title {
    width: 100%;
    text-align: center;
  }
}
</style>
