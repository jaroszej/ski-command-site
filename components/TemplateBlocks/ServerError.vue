<template>
  <div class="err">
    <h1>500</h1>
    <h2>Server Error</h2>
    <h3>Refresh or try again later</h3>
    <div class="wiggle">
      <img src="~/assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

  .wiggle {
    margin-left: auto;
    margin-right: auto;
    width: 130px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .err {
    margin-top: 50px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    background-color: $red;
    color: #FFFFFF;
    padding: 20px;
    text-align: center;
    border: 5px solid transparent;
    border-image: repeating-linear-gradient(45deg, #fff, #fff 10px, transparent 10px, transparent 30px) 20;
  }

  .err h2 {
    text-transform: uppercase;
  }

</style>
