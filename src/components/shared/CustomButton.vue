<template>
  <div class="custom-button pb-4">
    <button
      type="btn-type"
      class="btn btn-block"
      :class="[{ 'outline-button': btnType === 'cancel' }, btnName]"
      :disabled="isDisabled"
      @click="$emit('btnAction')"
    >
      {{ btnText }}
      <v-icon v-if="icon" class="text-light">{{ icon }}</v-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CustomButton extends Vue {
  @Prop({ default: null }) btnText!: string
  @Prop({ default: 'button' }) btnType!: string
  @Prop({ default: 'normal' }) btnName!: string
  @Prop({ default: null }) icon!: string
  @Prop(Boolean) isDisabled!: boolean
}
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    outline: none;
    box-shadow: none;
    color: $black;
    font-weight: bold;
    font-size: 1.2em;

    &:hover {
      color: $white;
    }
  }

  .outline-button {
    background: none !important;
    border: 2px solid rgb(8, 161, 28);
    &:hover {
      background: $button-gradient !important;
    }
  }
  .normal-btn {
    width: 100%;
    background: $button-gradient;
  }
  .google-btn {
    background: $google-gradient;
  }
  .facebook-btn {
    background: $facebook-gradient;
  }
}
</style>
