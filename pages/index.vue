<template>
  <div :class="aprilFools">
    <ShowCommands />
  </div>
</template>

<script>
import ShowCommands from '../components/ShowCommands.vue'

export default {
  name: 'IndexPage',
  components: { ShowCommands },
  data () {
    return {
    }
  },
  computed: {
    aprilFools () {
      const today = new Date()
      const isAprilFools = today.getMonth() === 3 && today.getDate() === 1
      // uncomment for testing vvv
      // const isAprilFools = today
      return isAprilFools ? 'april-fools' : ''
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&family=Rajdhani:wght@300;400;500;600;700&display=swap');

html,
body {
  font-family: Rajdhani, Tahoma, sans-serif;
  background-color: #202123;
  color:rgb(228, 228, 228);
  margin: 0;
  padding: 0;
}

.april-fools {
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: rgb(0, 255, 221);
  background-color: brown;
  height: 100vh;
  width: 100%;
}
</style>
