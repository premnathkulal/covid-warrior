<template>
  <div class="national-updates">
    <div class="info-text">
      <p class="overview-title">COIVD-19 Cases Overview</p>
      <p class="updated-date">Updated 14 Jul 21</p>
    </div>
    <div class="updates-container">
      <div class="updates container-fluid">
        <update-counter-card
          animation="confirmed"
          animationSize="100"
          title="Confirmed"
          count="30000"
          className="total-count"
        />
        <update-counter-card
          animation="active"
          animationSize="74"
          title="Active"
          count="30000"
          className="total-active"
        />
        <update-counter-card
          animation="recovered"
          animationSize="55"
          title="Recovered"
          count="30000"
          className="total-recovered"
        />
        <update-counter-card
          animation="death"
          animationSize="55"
          title="Death"
          count="30000"
          className="total-death"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UpdateCounterCard from '@/components/Home/UpdateCounterCard.vue'

@Component({ components: { UpdateCounterCard } })
export default class NationalUpdates extends Vue {}
</script>

<style lang="scss">
.national-updates {
  .info-text {
    background: $green-blue-gradient;
    height: 10rem;
    width: 100%;
    color: $text-color;

    padding-top: 1.8rem;
    text-align: center;

    .overview-title {
      font-weight: bold;
      font-size: 1.1rem;
      line-height: 0;
    }
    .updated-date {
      line-height: 0.8rem;
    }
  }
  .updates-container {
    position: relative;
    top: -4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .updates {
      overflow-x: scroll;
      white-space: nowrap;
      width: 80%;
      @media only screen and (max-width: 1400px) {
        width: 100%;
      }

      &-stats {
        width: 20rem;
        height: 12rem;
        display: inline-block;
        border-radius: 0.8rem;

        &:hover {
          box-shadow: 0 20px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .stat-header {
          display: flex;
          padding: 0.5rem 1rem;

          .stat-title {
            font-weight: bold;
            font-size: 1.5rem;
            color: $text-color;
          }
          .lottie-player {
            margin-left: auto;
          }
        }
        .stat-number {
          text-align: center;
          font-weight: bold;
          font-size: 1.7rem;
          padding: 1rem;
          animation: counter 2s alternate ease-in-out forwards;
          counter-reset: num var(--num);

          &::after {
            content: counter(num);
          }
        }
      }
      .total-count {
        background: $blue-gradient;
      }
      .total-active {
        background: $red-gradient;
      }
      .total-recovered {
        background: $green-gradient;
      }
      .total-death {
        background: $gray-gradient;
      }
    }
  }
}

@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

@keyframes counter {
  from {
    --num: 0;
  }
  to {
    --num: var(--count);
  }
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
