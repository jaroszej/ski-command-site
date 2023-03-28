<template>
  <div class="components">
    <img
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
  components: { ShowCommands }
}
</script>
