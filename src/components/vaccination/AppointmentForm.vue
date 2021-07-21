<template>
  <v-row class="appointment" justify="center">
    <beneficiary :dialog="dialog" @toggleDialog="toggleDialog" />
    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="dialog"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon light @click="$emit('toggleDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <p class="pt-4 text-dark title">Appointments</p>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn light text @click="toggleDialog()"> Add Beneficiary </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="beneficiary-list-field container">
          <div class="beneficiary-info">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item, i) in 5"
                :key="i"
                class="info-card"
              >
                <v-expansion-panel-header>
                  <h5>Premnath</h5>
                  <v-spacer></v-spacer> <v-spacer></v-spacer>
                  <!-- <span class="btn-text">Schedule</span> -->
                  <span class="btn-text">Update</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p class="appointment-info">
                    <span class="appointment-info-label">Date:</span>
                    Hello, World
                  </p>
                  <p class="appointment-info">
                    <span class="appointment-info-label">Slot:</span>
                    Hello, World
                  </p>
                  <p class="appointment-info">
                    <span class="appointment-info-label">Vaccine:</span>
                    Hello, World
                  </p>
                  <p class="appointment-info">
                    <span class="appointment-info-label">Adress:</span>
                    Hello, World
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Beneficiary from '@/components/vaccination/Beneficiary.vue'

@Component({
  components: {
    Beneficiary,
  },
})
export default class AppointmentForm extends Vue {
  @Prop({ default: false }) showDialog!: boolean
  notifications = false
  sound = true
  widgets = false
  alert = true
  dialog = false

  toggleDialog(): void {
    this.dialog = !this.dialog
  }
}
</script>

<style lang="scss">
.appointment {
  position: fixed;
  z-index: 4000;
}

.beneficiary-list-field {
  .info-card {
    margin-top: 1rem;
    border-left: 0.4rem solid $color-primary;
  }
  .beneficiary-info {
    .btn-text {
      text-align: right;
      margin-right: 1rem;
    }
    .appointment-info {
      font-size: 0.9rem;
      .appointment-info-label {
        font-weight: bold;
      }
    }
  }
}
</style>
