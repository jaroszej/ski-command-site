<template>
  <div class="content" :class="aprilFools">
    <div v-if="mongoErr">
      <ServerError />
    </div>
    <!-- grid-container -->
    <div v-else class="ok">
      <!-- header -->
      <div class="header sticky">
        <div v-if="!fool" class="logo">
          <img class="rocky" src="../assets/img/rockyCool.png" alt="rockyCool emote">
          <h1 class="title">
            Skimmands
          </h1>
        </div>
        <div v-else>
          <img src="../assets/img/pickleMercy.png" alt="pickleMercy" width="210">
          <h1>April Fools Skimmands!</h1>
        </div>
        <div class="filters">
          <div class="options">
            <span class="filter-label">Sort</span>
            <FilterMenu @filter="handleFilter" @change="refreshTable" />
          </div>
          <div class="search">
            <div class="search-info">
              <span class="status">
                {{ filterStatus }}
              </span>
              <div class="searchbar">
                <input
                  v-model="filterQuery"
                  class="searchbar-input"
                  type="text"
                  placeholder="Type here..."
                >
                <span class="clear">
                  <button class="clear-btn" @click="clearFilter" />
                </span>
              </div>
              <div v-if="fool && filterQuery" class="result">
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
      </div>
      <!-- nav-bar (left) -->
      <div class="sidebar site-nav">
        <span />
      </div>
      <!-- table -->
      <div class="comm-table">
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
      <FooterBlock class="footer" />
    </div>
  </div>
</template>

<script>
import * as Realm from 'realm-web'
import SocialBar from '~/components/TemplateBlocks/SocialBar.vue'
import CommandTable from '~/components/CommandTable.vue'
import ServerError from '~/components/TemplateBlocks/ServerError.vue'
import FooterBlock from '~/components/TemplateBlocks/Footer/FooterBlock.vue'
import FilterMenu from '~/components/TemplateBlocks/FilterMenu.vue'

export default {
  name: 'ShowCommands',
  components: {
    CommandTable,
    SocialBar,
    ServerError,
    FooterBlock,
    FilterMenu
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
      sort: 'none',
      cmdClicked: false
    }
  },
  computed: {
    fixedRight () {
      return `${window.scrollY}px`
    },

    filterTable () {
      const filteredComms = this.commands.filter((pair) => {
        for (const key in pair) {
          const value = pair[key].toString().toLowerCase()
          const query = this.filterQuery.toLowerCase()
          if ((key.includes(query) || value.includes(query))) {
            return true
          }
        }
        return false
      })

      if (this.sort === 'alpha') {
        filteredComms.sort((a, b) => {
          const varA = Object.values(a).find(value => typeof value === 'string').toLowerCase()
          const varB = Object.values(b).find(value => typeof value === 'string').toLowerCase()
          return varA.localeCompare(varB)
        })
      } else if (this.sort === 'reverseAlpha') {
        filteredComms.sort((a, b) => {
          const varA = Object.values(a).find(value => typeof value === 'string').toLowerCase()
          const varB = Object.values(b).find(value => typeof value === 'string').toLowerCase()
          return varB.localeCompare(varA)
        })
      }

      return filteredComms
    },

    filterStatus () {
      if (this.filterTable.length > 0) {
        return 'Filter for commands or values'
      } else {
        return this.loading ? 'Filter for commands or values' : '💔 No Match Found'
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
      }, 1500)
    },

    handleFilter (filterOption) {
      this.sort = filterOption
    },

    refreshTable () {
      this.sort = this.selected
    },

    clearFilter () {
      this.filterQuery = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/variables.scss';

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 111;
}

.content {
  text-align: center;
  font-size: 1.8rem;
  letter-spacing: 0.05rem;
  max-width: 1920px;
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
  height: 290px;
  background-color: $bg-gray;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom: 4px $gray-7 solid;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: $tablet) {
    width: 90vw;
    min-width: 336px;
  }

  @media screen and (min-width: $tablet) {
    height: 120px;
    width: 701px;
  }

  @media screen and (max-width: $tablet) and (max-height: $mobile) and (orientation: landscape) {
    height: 120px;
    width: 701px;
  }
}

.sidebar {
  min-height: 720px;
  padding: 0 10px 0;

  @media screen and (max-width: $mobile) {
    min-height: 540px;
    padding: 0;
  }
}

.fixed {
  position: fixed;
  top: 33%;
  right: 0;
  z-index: 155;
}

.site-nav {
  grid-area: 2 / 1 / 3 / 2;
}

.external-links {
  grid-area: 2 / 3 / 3 / 4;

  @media screen and (max-width: $tablet) {
    display: none;
  }
}

.comm-table {
  grid-area: 2 / 2 / 3 / 3;
}

.footer {
  grid-area: 3 / 1 / 4 / 4;
  margin-bottom: 20px;
  color: $gray-6;
  font-size: 10px;
}

.logo {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 92px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;

  @media screen and (min-width: $tablet) {
    width: 112px;
    margin-left: 18px;
    padding-left: 38px;
  }

  @media screen and (max-width: $tablet) and (max-height: $mobile) and (orientation: landscape) {
    width: 112px;
    margin-left: 18px;
    padding-left: 38px;
  }
}

.rocky {
  display: block;
  margin-right: auto;
  margin-top: 20px;
  display: flex;
  width: 48px;
  margin-left: 28px;

  @media screen and (max-width: $tablet) {
    margin-left: auto;
    margin-right: auto;
    margin-top: 12px;
  }

  @media screen and (max-width: $laptop) and (orientation: landscape) {
    display: flex;
  }
}

.title {
  font-family: 'Sofia Sans Extra Condensed', Arial, Helvetica, sans-serif, sans-serif;
  display: flex;
  font-size: 28px;
  margin: 0;

  @media screen and (max-width: $tablet) {
    font-size:24px;
    margin-left: auto;
    margin-right: auto;
  }

}

.filters {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  height: 198px;
  width: auto;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;

  @media screen and (min-width: $tablet) {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    margin-top: 12px;
    margin-left: 169px;
    width: 71%;
  }

  @media screen and (max-width: $tablet) and (max-height: $mobile) and (orientation: landscape) {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    margin-top: 12px;
    margin-left: 169px;
    width: 71%;
  }

}

.options {
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 12px 0;

  @media screen and (max-width: $tablet) {
    width: 100%;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }

  @media screen and (min-width: $tablet) and (orientation: landscape) {
    width: 164px;
    margin-left: 34px;
  }
}

.search {
  width: 55%;

  @media screen and (max-width: $tablet) {
    width: 100%;
    margin-bottom: 12px;
  }

  @media screen and (min-width: $tablet) and (orientation: landscape) {
    width: 254px;
  }
}

.search-info {
  margin: 12px 0;

  @media screen and (max-width: $mobile) {
    margin: 4px 0;
  }
}

.searchbar {
  display: flex;
  justify-content: center;
  margin: 12px 0;
}

.searchbar-input {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  border-bottom: 2px solid $gray-5;
  outline: none;
  width: 200px;
}

.searchbar-input:focus {
  border-bottom: 2px solid $gray-6;
}

.clear {
  margin-left: 12px;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
}

.clear-btn {
  background-image: url('~@/assets/img/delete.png');
  // filters to #777
  filter: invert(51%)
    sepia(12%)
    saturate(7%)
    hue-rotate(322deg)
    brightness(88%)
    contrast(83%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 28px;
  height: 28px;
  margin: 0 5px 1px 1px;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  cursor: pointer;
  // filters to $yellow
  &:hover {
    filter: invert(89%)
      sepia(95%)
      saturate(4042%)
      hue-rotate(319deg)
      brightness(97%)
      contrast(107%);
  }
  // filters to $orange
  &:active {
    filter: invert(46%)
      sepia(43%)
      saturate(1888%)
      hue-rotate(8deg)
      brightness(106%)
      contrast(91%);
  }
}

.result {
  margin-top: 260px;
  border-radius: 50%;
}

</style>
