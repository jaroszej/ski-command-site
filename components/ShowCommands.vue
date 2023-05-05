<template>
  <div class="content">
    <div v-if="mongoErr" class="err">
      <h2>Server Error</h2>
      <h3>Try again later</h3>
      <div class="wiggle">
        <img src="../assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
      </div>
    </div>
    <!-- grid-container -->
    <div v-else class="ok">
      <!-- header -->
      <div class="header">
        <img class="rocky" src="../assets/img/rockyCool.png" alt="rockyCool emote">
        <h1 class="title">
          Skimmands
        </h1>
      </div>

      <!-- nav-bar (left) -->
      <div class="sidebar site-nav">
        <span />
      </div>
      <!-- table -->
      <div class="cmd-table">
        <div class="search-info">
          {{ filterStatus }}
          <div class="searchbar">
            <input
              v-model="filterQuery"
              class="searchbar-input"
              type="text"
              placeholder="Type here"
            >
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th class="cmd">
                <span>Command</span>
              </th>
              <th class="val">
                <span>Value</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(command, index) in filterTable" :key="index">
              <td class="cmd">
                <div
                  v-show="cmdClicked === index"
                  class="copied-msg"
                >
                  Copied !{{ command.variable }} to clipboard
                </div>
                <button @click="copyToClipboard(index)">
                  {{ command.variable }}
                </button>
              </td>
              <td class="val">
                {{ command.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- links (right) -->
      <div class="sidebar external-links">
        <SocialBar class="fixed" :style="{ sticky: fixedRight }" />
      </div>
      <!-- footer -->
      <div class="footer">
        <span class="flower">🌻</span>
        <div class="attributions">
          <a href="https://www.flaticon.com/free-icons/twitch" title="twitch icons">Twitch icons created by Enamo Studios - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/tiktok" title="tiktok icons">Tiktok icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/twitter" title="twitter icons">Twitter icons created by Bogdan Rosu - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/social-network" title="social network icons">Social network icons created by riajulislam - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/discord" title="discord icons">Discord icons created by Hight Quality Icons - Flaticon</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Realm from 'realm-web'
import SocialBar from '../components/SocialBar.vue'

export default {
  name: 'SkiestiCommands',
  components: {
    SocialBar
  },
  data () {
    return {
      commands: [],
      filterQuery: '',
      mongoErr: false,
      cmdClicked: false
    }
  },
  computed: {
    filterTable () {
      return this.commands.filter((pair) => {
        for (const key in pair) {
          const value = pair[key].toString()
          if ((key.includes(this.filterQuery) || value.includes(this.filterQuery))) {
            return true
          }
        }
        return false
      })
    },
    filterStatus () {
      if (this.filterTable.length > 0) {
        return 'Filter for commands or values'
      } else {
        return '💔 No Match Found'
      }
    },
    fixedRight () {
      return `${window.scrollY}px`
    }
  },
  async mounted () {
    const app = new Realm.App({ id: 'data-npueo' })
    const credentials = Realm.Credentials.apiKey(process.env.realmKey)
    try {
      const user = await app.logIn(credentials)
      const comms = await user.functions.getCommands()

      if (comms.result.code === '0') {
        const dbData = comms.result.data
        this.cleanData(dbData)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to log in', err)
      this.mongoErr = true
    }
  },
  methods: {
    cleanData (dbData) {
      this.commands = dbData.map((item, index) => {
        const { variable, value } = item
        return { variable, value, index }
      })
    },
    copyToClipboard (index) {
      this.cmdClicked = index
      setTimeout(() => {
        this.cmdClicked = null
      }, 2000)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&family=Sofia+Sans+Extra+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Titan+One&display=swap');

.content {
    text-align: center;
    font-size: 1.8rem;
    letter-spacing: 0.05rem;
}

.ok {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.header {
  grid-area: 1 / 2 / 2 / 3;
}

.rocky {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width:150px;
}

.search-info {
  margin: 12px;
}

.searchbar {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.searchbar-input {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  border-bottom: 2px solid #555;
  outline: none;
  width: 200px;
}

.searchbar-input:focus {
  border-bottom: 2px solid #666;
}

.sidebar {
  min-height: 800px;
  padding: 0 10px 0;
}

.fixed {
  position: fixed;
  top: 33%;
  right: 0;
}

.site-nav {
  grid-area: 2 / 1 / 3 / 2;
}

.external-links {
  grid-area: 2 / 3 / 3 / 4;
}

.cmd-table {
  grid-area: 2 / 2 / 3 / 3;
}

.footer {
  grid-area: 3 / 1 / 4 / 4;
  margin-bottom: 20px;
  color: #666;
  font-size: 10px;
}

.flower {
  font-size: 32px;
}

.attributions {
  border-top: 3px solid #777;
  margin-top: 120px;
  padding-top: 20px;
}

.attributions a {
  color: #777;
}

table {
    table-layout: fixed;
    box-sizing: border-box;
    border: 2px solid rgb(121, 121, 121);
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}

th {
    font-weight: bold;
}

th, td {
    padding: 0.5rem;
}

.title {
    font-family: 'Sofia Sans Extra Condensed', Arial, Helvetica, sans-serif, sans-serif;
}

.cmd {
    width: 200px;
    overflow: auto;
}

.cmd button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  outline: inherit;
  display: inline;
  padding: 0;
  text-decoration: none;
  border-bottom: dashed 1px rgb(228, 228, 228);
}

.cmd:hover {
  text-decoration: underline;
  text-decoration-color: rgb(255, 200, 61);
}

.cmd:active {
  text-decoration: underline;
  text-decoration-color: rgb(255, 164, 60);
}

.copied-msg {
  position: fixed;
  top: 30px;
  left: auto;
  right: auto;
  z-index: 995;
  transform: translateY(-50%);
  background-color: rgb(255,200,61);
  color: rgb(32,33,35);
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
}

.val {
    width: 400px;
    overflow-wrap: break-word;
    padding-right: 40px;
    padding-left: 40px;
    border-left: 2px solid rgb(121, 121, 121);
    text-align: left;
}

td {
    padding: 12px 0;
    text-align: center;
    vertical-align: middle;
    border-top: 2px solid rgb(121, 121, 121);
}

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
    background-color: #b82727;
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
