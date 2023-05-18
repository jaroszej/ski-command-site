<template>
  <div class="dropdown-menu">
    <select v-model="selected">
      <option value="none">
        Chronological
      </option>
      <option value="alpha">
        A → Z
      </option>
      <option value="reverseAlpha">
        Z → A
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
.dropdown-menu {
  margin-top: 12px;
}
</style>
