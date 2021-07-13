<template>
  <div class="custom-input pb-3">
    <div class="input-field">
      <input
        :id="id"
        autocomplete="off"
        class="form-control"
        :class="{ active: value }"
        :value="value"
        :type="inputType"
        :required="isRequired"
        @focus="showOption = true"
        @input="inputAction($event)"
        @blur="$emit('blurAction')"
        @keydown="$emit('keyDownAction')"
      />
      <label class="label" :for="id">{{ label }}</label>
      <span class="input-error text-danger">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CustomInput extends Vue {
  @Prop({ default: null }) id!: string
  @Prop({ default: null }) value!: string
  @Prop({ default: null }) placeHolder!: string
  @Prop({ default: null }) errorMessage!: string
  @Prop({ default: null }) inputType!: string
  @Prop(Boolean) isError!: boolean
  @Prop(Boolean) isRequired!: boolean
  @Prop({ default: false }) allowFilter!: boolean

  label = this.placeHolder

  blurAction(): void {
    this.$emit('blurAction')
  }

  inputAction(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    this.$emit('input', target.value)
  }
}
</script>

<style lang="scss">
.custom-input {
  position: relative;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .input-field {
    width: 40%;
    @media only screen and (max-width: 900px) {
      width: 80%;
    }

    .form-control {
      border: none;
      outline: none;
      border-bottom: 2px solid rgb(83, 117, 3);
      color: black;
      background: rgba(142, 238, 142, 0.363);
      width: 100%;
      padding: 1rem 0.4rem;
      transition: 0.3s ease all;
      border-radius: 0;

      &:focus {
        box-shadow: none;
      }
    }

    .label {
      position: relative;
      pointer-events: none;
      top: -1.9rem;
      left: 0.4rem;
      transition: 0.3s ease all;
      opacity: 0.5;
    }

    .form-control:focus ~ .label,
    .active ~ .label {
      font-size: 14px;
      top: -3.8rem;
      left: 1px;
      color: black;
      opacity: 1;
    }

    .input-error {
      font-size: 12px;
      position: relative;
      bottom: 0;
      left: -4rem;
      letter-spacing: 0.3px;
    }
  }
}
</style>
