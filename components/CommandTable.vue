<template>
  <div class="table-content">
    <div v-if="loading" class="wiggle-wait">
      <h2>Fetching Data...</h2>
      <h3>We wiggle</h3>
      <div class="wiggle">
        <img src="../assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
      </div>
    </div>
    <div v-else class="cmd-table">
      <div v-if="!fool" class="table">
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
            <tr v-for="(command, index) in commands" :key="index">
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
      <div v-else class="marquee">
        <vue-marquee-slider
          id="marquee-slider-loop"
          :auto-width="false"
          :speed="1000000"
          :repeat="40"
          :space="32"
          :width="380"
        >
          <div v-for="(command, index) in commands" :key="index" class="command">
            <div
              v-show="cmdClicked === index"
              class="copied-msg"
              :class="aprilFools"
            >
              Copied !{{ command.variable }} to clipboard
            </div>
            <button class="marquee-btn" @click="copyToClipboard(index)">
              {{ command.variable }}
            </button>
            <div>{{ command.value }}</div>
          </div>
        </vue-marquee-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandTable',
  components: { },
  props: {
    commands: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    fool: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      cmdClicked: false
    }
  },
  computed: {
    aprilFools () {
      return this.fool
    }
  },
  methods: {
    copyToClipboard (index) {
      this.cmdClicked = index
      navigator.clipboard.writeText(`!${this.commands[index].variable}`)
      setTimeout(() => {
        this.cmdClicked = null
      }, 2000)
    }
  }
}
</script>

<style scoped>

.table-content {
    margin-top: 20px;
    text-align: center;
    font-size: 1.8rem;
    letter-spacing: 0.05rem;
}

.cmd-table {
  grid-area: 2 / 2 / 3 / 3;
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

.april-fools {
  background-color: rgba(129, 255, 57, 0.5);
  font-weight: 800;
  font-style: italic;
  text-decoration: double;
  padding: 10px;
  margin-top: 20px;
}

#marquee-slider-loop {
  margin-top: 80px;
  width: 800px;
  height: auto;
}

.marquee {
  width: 100%;
}

.marquee-btn {
  background: yellow;
}

</style>
