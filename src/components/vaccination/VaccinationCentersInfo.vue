<template>
  <div class="vaccination-center-info pl-5">
    <div class="info-header">
      <p class="name">Kanachur Hospital</p>
      <p class="fee-type p-1 free">Paid</p>
    </div>
    <div class="info-body">
      <div class="adress mt-4">
        <p class="address">University Road Deralakatte</p>
        <p class="state-name">Karnataka</p>
        <p class="district_name">Dakshina Kannada</p>
        <p class="block-name">Mangalore</p>
        <p class="pincode">575018</p>
      </div>
      <div class="vaccine-info-field">
        <div class="vaccine-info">
          <p class="field-title pb-3">Vaccination Details</p>
          <div class="d-flex">
            <p class="label d-none d-md-block">Date :</p>
            <p class="date">03-07-2021</p>
          </div>
          <div class="d-flex">
            <p class="label d-none d-md-block">Vaccine Name :</p>
            <p class="vaccine-name">COVISHIELD</p>
          </div>
          <div class="d-flex">
            <p class="label d-none d-md-block">Fee :</p>
            <p class="fee">Rs. 750</p>
          </div>
        </div>
        <div class="slots">
          <p class="slots-title">Slots</p>
          <template v-for="(item, index) in 4">
            <p class="slot-time" :key="index">Karnataka</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class VaccinationCenterInfo extends Vue {}
</script>

<style lang="scss">
.vaccination-center-info {
  background: $white;
  padding: 0.5rem;
  margin: 1rem 0.8rem;
  border-radius: 0.8rem;
  margin-top: 1rem;

  .info-header {
    padding: 0.2rem;
    display: flex;
    font-weight: bold;
    .name {
      font-size: 1.2rem;
    }
    .fee-type {
      margin-left: auto;
      font-size: 0.8rem;
      color: $white;
      border-radius: 0.5rem;
    }
    .paid {
      background: $light-red;
    }
    .free {
      background: $lemon-green;
    }
  }

  .info-body {
    display: flex;
    .adress {
      font-weight: 300;
      line-height: 1rem;
    }
    .vaccine-info-field {
      margin: 0 5rem;
      display: flex;
      align-items: center;
      background: rgba($color-background, 0.5);
      border-radius: 0.8rem;
      padding: 1rem;
      flex: 1;

      .vaccine-info {
        width: 70%;
        line-height: 0.8rem;
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
        width: 25%;
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
          width: 50%;
        }
        .slots {
          width: 50%;
        }
      }
    }
  }

  &:hover {
    box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.09);
    transition: all 0.3s ease;
  }
}
</style>
