<template>
  <div class="content" :class="aprilFools">
    <div v-if="mongoErr" class="err">
      <h1>500</h1>
      <h2>Server Error</h2>
      <h3>Refresh or try again later</h3>
      <div class="wiggle">
        <img src="../assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
      </div>
    </div>
    <!-- grid-container -->
    <div v-else class="ok">
      <!-- header -->
      <div class="header sticky">
        <div v-if="!fool">
          <img class="rocky" src="../assets/img/rockyCool.png" alt="rockyCool emote">
          <h1 class="title">
            Skimmands
          </h1>
        </div>
        <div v-else>
          <img src="../assets/img/pickleMercy.png" alt="pickleMercy" width="210">
          <h1>April Fools Skimmands!</h1>
        </div>
        <div class="search">
          <div class="search-info">
            {{ filterStatus }}
            <div class="searchbar">
              <input
                v-model="filterQuery"
                class="searchbar-input"
                type="text"
                placeholder="Type here..."
              >
            </div>
            <div v-if="filterQuery" class="result">
              <table>
                <tbody>
                  <tr v-for="(command, index) in filterTable" :key="index">
                    <td class="cmd">
                      <div
                        v-show="cmdClicked === index"
                        class="copied-msg"
                        :class="aprilFools"
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
          </div>
        </div>
      </div>
      <!-- nav-bar (left) -->
      <div class="sidebar site-nav">
        <span />
      </div>
      <!-- table -->
      <div class="cmd-table">
        <CommandTable
          :commands="filterTable"
          :loading="loading"
          :fool="fool"
        />
      </div>
      <!-- links (right) -->
      <div class="sidebar external-links">
        <SocialBar
          class="fixed"
          :fool="fool"
        />
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
import CommandTable from '../components/CommandTable.vue'

export default {
  name: 'ShowCommands',
  components: {
    CommandTable,
    SocialBar
  },
  props: {
    fool: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      mongoErr: false,
      loading: true,
      commands: [],
      filterQuery: '',
      cmdClicked: false
    }
  },
  computed: {
    fixedRight () {
      return `${window.scrollY}px`
    },
    filterTable () {
      return this.commands.filter((pair) => {
        for (const key in pair) {
          const value = pair[key].toString().toLowerCase()
          const query = this.filterQuery.toLowerCase()
          if ((key.includes(query) || value.includes(query))) {
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
    aprilFools () {
      return this.fool
    }
  },
  async mounted () {
    this.loading = true
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
      this.loading = false
    }
  },
  methods: {
    cleanData (dbData) {
      this.commands = dbData.map((item, index) => {
        const { variable, value } = item
        return { variable, value, index }
      })
      this.loading = false
    },
    copyToClipboard (index) {
      this.cmdClicked = index
      navigator.clipboard.writeText(`!${this.filterTable[index].variable}`)
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

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

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
  height: 300px;
  background-color: #202123;
  border-radius: 12px;
  border-bottom: 4px #777 solid;
}

.rocky {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width:120px;
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

.title {
    font-family: 'Sofia Sans Extra Condensed', Arial, Helvetica, sans-serif, sans-serif;
    font-size: 48px;
    margin: 0;
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

.search-info {
  margin: 12px;
}

.searchbar {
  display: flex;
  justify-content: center;
  margin: 12px;
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

.april-fools {
  border: 15px dashed gold;
  border-top-right-radius: 40px;
}

.result {
  margin-top: 260px;
}

.cmd button {
  font: inherit;
  display: inline;
  background-color: greenyellow;
}

</style>
