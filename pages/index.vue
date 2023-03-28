<template>
  <div :class="aprilFools">
    <img
      class="rocky"
      src="../assets/img/rockyCool.png"
      alt="rockyCool twitch emote"
      width="200"
    >
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
html,
body {
  font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(245, 236, 213);
  margin: 0;
  padding: 0;
}

.rocky {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.april-fools {
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: rgb(0, 255, 221);
  background-color: brown;
  height: 100vh;
  width: 100%;
}
</style>
