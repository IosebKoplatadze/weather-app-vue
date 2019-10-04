<template>
  <div class="input-group">
    <span v-if="notFound">City not found</span>
    <div class="control">
      <input
        type="text"
        class="input"
        placeholder="Search City..."
        v-model="city"
        v-on:keyup.enter="addHandler()"
      />
      <button @click="addHandler()" class="input-append" type="button">Add</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddCity',
  data() {
    return {
      city: '',
      notFound: false,
    };
  },
  methods: {
    ...mapActions(['addCityAction']),
    async addHandler() {
      this.notFound = false;
      if (!this.city || !this.city.length) {
        return;
      }
      this.notFound = !(await this.addCityAction(this.city));
      this.city = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.control {
  display: flex;
  justify-content: center;
}
.input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &-append {
    margin-left: -1px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #6c757d;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>