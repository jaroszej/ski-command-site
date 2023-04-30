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
            <tr v-for="command in filterTable" :key="command.variable">
              <td class="cmd">
                {{ command.variable }}
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
        <span />
      </div>
      <!-- footer -->
      <div class="footer">
        <span>🌻</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as Realm from 'realm-web'

export default {
  name: 'SkiestiCommands',
  data () {
    return {
      commands: [],
      filterQuery: '',
      mongoErr: false
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
    }
  },
  async mounted () {
    const app = new Realm.App({ id: 'data-npueo' })
    const credentials = Realm.Credentials.anonymous()
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
      this.commands = dbData.map((item) => {
        const { variable, value } = item
        return { variable, value }
      })
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
  margin: 8px;
}

.sidebar {
  min-height: 1000px;
  padding: 0 10px 0;
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
  grid-area: 3 / 2 / 4 / 3;
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
    width: 240px;
    overflow: auto;
}

.val {
    width: 320px;
    overflow: auto;
    padding-right: 40px;
    padding-left: 40px;
    border-left: 2px solid rgb(121, 121, 121);
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
