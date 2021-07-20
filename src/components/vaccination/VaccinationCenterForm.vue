<template>
  <div class="vaccination-center-form">
    <div class="form">
      <div
        class="toggle-btn d-flex d-md-none justify-content-end"
        @click="toggleForm()"
      >
        <v-icon class="icons">{{
          showForm ? 'mdi-chevron-up' : 'mdi-chevron-down'
        }}</v-icon>
      </div>
      <span
        class="form-inputs"
        :class="showForm ? 'd-block d-md-flex' : 'd-none d-md-flex'"
      >
        <v-select
          class="select"
          :items="items"
          label="Solo field"
          dense
          solo
        ></v-select>
        <v-select
          class="select"
          :items="items"
          label="Solo field"
          dense
          solo
        ></v-select>
        <v-select
          class="select"
          :items="items"
          label="Solo field"
          dense
          solo
        ></v-select>
        <div class="select">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date"
                color="dark"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="dark" @click="modal = false"> Cancel </v-btn>
              <v-btn text color="dark" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class VaccinationCenterForm extends Vue {
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
  date = new Date().toISOString().substr(0, 7)
  menu = false
  modal = false
  showForm = false

  toggleForm(): void {
    this.showForm = !this.showForm
  }
}
</script>

<style lang="scss">
.vaccination-center-form {
  position: fixed;
  z-index: 3000;
  top: 7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  background: $color-background;

  @media only screen and (max-width: 960px) {
    top: 6.4rem;
    box-shadow: 0px 5px 8px rgb(168, 167, 167);
  }
  .form {
    margin: 2rem 0 1rem 1rem;
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    .form-inputs {
      .select {
        width: 23%;
        margin-right: 1rem;
      }
    }
  }
  @media only screen and (max-width: 960px) {
    .form {
      display: block;
      margin: 1rem;
      padding: 0 0;
      width: 100%;
      .form-inputs {
        display: none;
        .select {
          width: 100%;
          margin-right: 1rem;
        }
        height: 18rem;
        overflow-y: scroll;
      }
      .toggle-btn {
        height: 1rem;
        .icons {
          font-size: 2rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
