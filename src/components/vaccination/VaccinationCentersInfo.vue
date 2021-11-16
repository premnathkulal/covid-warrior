<template>
  <div class="vaccination-center-info">
    <div class="info-body">
      <div class="adress mt-4">
        <p class="address">{{ centerInfo.address }}</p>
        <p class="state-name">{{ centerInfo.state_name }}</p>
        <p class="district_name">{{ centerInfo.district_name }}</p>
        <p class="block-name">{{ centerInfo.block_name }}</p>
        <p class="pincode">{{ centerInfo.pincode }}</p>
      </div>
      <div class="vaccine-info-field">
        <div class="vaccine-info">
          <p class="field-title pb-3 d-none d-sm-block">Vaccination Details</p>
          <div class="d-flex">
            <p class="label d-none d-md-block">Date :</p>
            <p class="date">{{ centerInfo.date | dateFormate }}</p>
          </div>
          <div class="d-flex">
            <p class="label d-none d-md-block">Vaccine Name :</p>
            <p class="vaccine-name">{{ centerInfo.vaccine }}</p>
          </div>
          <div class="d-flex" v-if="centerInfo.fee_type !== 'Free'">
            <p class="label d-none d-md-block">Fee :</p>
            <p class="fee">Rs. {{ centerInfo.fee }}</p>
          </div>
        </div>
        <div class="slots">
          <p class="slots-title">Slots</p>
          <p
            v-for="(item, index) in centerInfo.slots"
            class="slot-time"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { VaccinationCenter } from '@/types/interface'

@Component
export default class VaccinationCenterInfo extends Vue {
  @Prop({ default: null }) centerInfo!: VaccinationCenter
}
</script>

<style lang="scss">
.vaccination-center-info {
  .info-body {
    display: flex;
    .adress {
      font-weight: 300;
      line-height: 1rem;
      width: 15rem;
    }
    .vaccine-info-field {
      display: flex;
      align-items: center;
      background: rgba($color-background, 0.5);
      border-radius: 0.8rem;
      padding: 1rem;
      flex: 1;

      .vaccine-info {
        line-height: 0.8rem;
        padding-right: 1rem;
        .field-title {
          margin-top: -1rem;
          font-weight: 400;
          line-height: 1rem;
        }
        .label {
          width: 8rem;
        }
      }
      .slots {
        padding: 1rem;
        margin-left: auto;
        background: $dark-gray;
        border-radius: 0.8rem;
        line-height: 0.5rem;
        font-weight: 300;
        font-size: 0.9rem;
        .slots-title {
          font-size: 1.1rem;
          font-weight: bold;
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    .info-body {
      display: block;
      .vaccine-info-field {
        margin: 0 0rem;
        .vaccine-info {
          // width: 50%;
        }
        .slots {
          // width: 50%;
          padding: 1rem 0.5rem;
        }
      }
    }
  }
}
</style>
