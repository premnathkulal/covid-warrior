<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="320">
      <v-card>
        <v-card-title>
          {{ msg }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$emit('toggleAlertBox', false)"
          >
            No
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="$emit('toggleAlertBox', true)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AlertBox extends Vue {
  @Prop({ default: false }) dialog!: boolean
  @Prop({ default: '' }) msg!: string
}
</script>

<style lang="scss"></style>
