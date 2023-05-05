<template>
  <div class="commands-list" :class="aprilFools">
    <ShowCommands :fool="aprilFools" />
  </div>
</template>

<script>
import ShowCommands from '../components/ShowCommands.vue'

export default {
  name: 'IndexPage',
  components: {
    ShowCommands
  },
  data () {
    return {
    }
  },
  computed: {
    aprilFools () {
      const today = new Date()
      // const isAprilFools = today.getMonth() === 3 && today.getDate() === 1
      const isAprilFools = today
      return isAprilFools ? 'april-fools' : ''
    }
  }
}
</script>

<style>
html,
body {
  font-family: "Helvetica Neue", Tahoma, sans-serif;
  background-color: #202123;
  color:rgb(228, 228, 228);
  margin: 0;
  padding: 0;
  font-size: 9.5px;
}

.april-fools {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 12px;
  color: rgb(0, 255, 221);
  background-color: brown;
  height: 3000vh;
  width: 100%;
}
</style>
