<template>
  <div id="footer">
    <span class="flower">🌻</span>
    <div class="attributions">
      <ul>
        <li>
          <a href="https://www.flaticon.com/free-icons/twitch" title="twitch icons">Twitch icons created by Enamo Studios - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/tiktok" title="tiktok icons">Tiktok icons created by Freepik - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/twitter" title="twitter icons">Twitter icons created by Bogdan Rosu - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/social-network" title="social network icons">Social network icons created by riajulislam - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/discord" title="discord icons">Discord icons created by Hight Quality Icons - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by Those Icons - Flaticon</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~assets/styles/variables.scss';

  .flower {
    font-size: 32px;
  }

  .attributions {
    border-top: 3px solid $gray-7;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 80px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 8px;
        a {
          color: $gray-5;
          margin: 8px;
        }
      }
    }
  }

</style>
