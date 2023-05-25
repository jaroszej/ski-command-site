<template>
  <div class="dropdown-menu">
    <select v-model="selected">
      <option value="none">
        <span class="opt">Default</span>
      </option>
      <option value="alpha">
        <span class="opt">A → Z</span>
      </option>
      <option value="reverseAlpha">
        <span class="opt">Z → A</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',
  data () {
    return {
      selected: 'none'
    }
  },
  watch: {
    selected () {
      this.filterData()
    }
  },
  methods: {
    filterData () {
      if (this.selected === 'alpha') {
        this.$emit('filter', 'alpha')
      } else if (this.selected === 'reverseAlpha') {
        this.$emit('filter', 'reverseAlpha')
      } else {
        this.$emit('filter', 'none')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.dropdown-menu {
  margin-top: 12px;
  position: relative;
  display: inline-block;

  select {
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    border: 2px solid $gray-5;
    background-color: #fff;
    color: $gray-7;
    outline: none;
    transition: border-color 0.3s ease;
  }

  @media screen and (max-width: $mobile) {
    margin-top: 4px;
  }
}

</style>
