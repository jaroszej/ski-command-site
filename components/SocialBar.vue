<template>
  <div class="social-bar">
    <div class="links">
      <div class="social-link">
        <a href="https://www.twitch.tv/skiesti" target="_blank">
          <img src="../assets/img/twitch.png" alt="Twitch">
        </a>
        <a href="https://www.youtube.com/channel/UC2jM3ptUEkupvP_NMh4eQmg" target="_blank">
          <img src="../assets/img/youtube.png" alt="YouTube">
        </a>
        <a href="https://twitter.com/skiesti_" target="_blank">
          <img src="../assets/img/twitter.png" alt="Twitter">
        </a>
        <a href="https://discord.gg/8UgX5mM" target="_blank">
          <img src="../assets/img/discord.png" alt="Discord">
        </a>
        <a href="https://www.instagram.com/skiesti_" target="_blank">
          <img src="../assets/img/instagram.png" alt="Instagram">
        </a>
        <a href="https://www.tiktok.com/@skiesti" target="_blank">
          <img src="../assets/img/tiktok.png" alt="TikTok">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialBar'
}
</script>

<style>
  .social-bar {
    position: relative;
    height: 50%;
  }

  .links {
    position: absolute;
    top: 33%;
    right: 0;
    transform: translateY(-50%);
    background-color: #777;
    padding: 20px 10px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .social-link a img {
    width: 54px;
    padding: 2px 0 2px 0;
  }

  .social-link a img:hover {
    border-radius: 27px;
    box-shadow: 0 0 5px 3px rgba(255,200,61, 1.0);
    background-color: rgb(255, 200, 61);
  }

  .social-link a img:active {
    border-radius: 27px;
    box-shadow: 0 0 5px 3px rgb(255, 164, 60);
    background-color: rgb(255, 164, 60);
  }

</style>
