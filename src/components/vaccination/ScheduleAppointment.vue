<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <!-- <span class="text-h5 mb-5">Add Beneficiary</span> -->
        </v-card-title>
        <v-card-text>
          <custom-input id="name" placeHolder="Name" inputType="text" />
          <custom-input
            id="login-password"
            placeHolder="Password"
            inputType="password"
          />
          <custom-input
            id="login-password"
            placeHolder="Password"
            inputType="password"
          />
          <custom-input
            id="login-password"
            placeHolder="Password"
            inputType="password"
          />
          <custom-button btnText="Login" btnName="normal-btn" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('toggleDialog')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="$emit('toggleDialog')">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CustomInput from '@/components/shared/CustomInput.vue'
import CustomButton from '@/components/shared/CustomButton.vue'

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class ScheduleAppointment extends Vue {
  @Prop({ default: false }) dialog!: boolean
  showDialog = false

  @Watch('dialog')
  toggleDialog(): void {
    this.showDialog = this.dialog
  }
}
</script>

<style lang="scss"></style>
