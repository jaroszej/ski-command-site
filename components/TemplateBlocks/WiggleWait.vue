<template>
  <div class="wiggle-wait" :class="{ hide: hitFooter }">
    <h2>Fetching Data...</h2>
    <h3>We wiggle</h3>
    <div class="wiggle">
      <img src="~/assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
    </div>
  </div>
</template>

<script>
export default {
  name: 'WiggleWait',
  data () {
    return {
      hitFooter: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.pagePosition)
  },
  methods: {
    pagePosition () {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPosition = scrollTop + windowHeight
      const scrollThreshold = documentHeight * 0.76

      if (scrollPosition >= scrollThreshold) {
        this.hitFooter = true
      } else {
        this.hitFooter = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

  .wiggle-wait {
    @media screen and (max-width: $laptop) and (orientation: landscape) {
      position: fixed;
      width: 86%;

      h2 {
        margin-top: 0;
      }
    }

  }

  .hide {
    display: none;
  }

  .wiggle {
    margin-left: auto;
    margin-right: auto;
    width: 130px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
