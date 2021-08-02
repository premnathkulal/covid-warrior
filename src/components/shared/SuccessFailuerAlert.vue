<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="320"
      ><v-card>
        <div class="details">
          <lottie-player
            :key="animation ? 'success' : 'error'"
            :src="
              animation
                ? '/assets/lotties/success.json'
                : '/assets/lotties/error.json'
            "
            :style="`width: 200px`"
            class="lottie-player m-4"
            autoplay
            mode="normal"
            background="transparent"
          >
          </lottie-player>
          <p class="alert-message">{{ alertMessage }}</p>
        </div>
        <div class="mx-4">
          <custom-button
            btnText="Ok"
            btnType="submit"
            btnName="normal-btn"
            @btnAction="$emit('toggleAlertBox')"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CustomButton from '@/components/shared/CustomButton.vue'

@Component({
  components: {
    CustomButton,
  },
})
export default class SuccessFailuerAlert extends Vue {
  @Prop({ default: false }) dialog!: boolean
  @Prop({ default: '' }) alertMessage!: string
  @Prop({ default: false }) isSuccess!: boolean
  animation = false

  @Watch('isSuccess')
  setAnimation(): void {
    console.log(this.isSuccess)
    this.animation = this.isSuccess
  }
}
</script>

<style lang="scss">
.details {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .alert-message {
    font-size: 1.4rem;
    margin-top: -1rem;
  }
}
</style>
