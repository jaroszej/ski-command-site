<template>
  <div class="table-content">
    <div v-if="loading">
      <WiggleWait />
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
                <TooltipButton :button-text="command.variable.toString()" @click="isTooltipClicked()" />
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
import TooltipButton from '~/components/TooltipButton.vue'
import WiggleWait from '~/components/TemplateBlocks/WiggleWait.vue'

export default {
  name: 'CommandTable',
  components: {
    TooltipButton,
    WiggleWait
  },
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
      cmdClicked: null,
      isClicked: false
    }
  },
  computed: {
    aprilFools () {
      return this.fool
    }
  },
  methods: {
    copyToClipboard (index) {
      this.isClicked = true
      this.cmdClicked = index
      navigator.clipboard.writeText(`!${this.commands[index].variable}`)
      setTimeout(() => {
        this.cmdClicked = null
        this.isClicked = false
      }, 1250)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/variables.scss';

.table-content {
    margin-top: 20px;
    text-align: center;
    font-size: 1.8rem;
    letter-spacing: 0.05rem;

    @media screen and (max-width: $mobile) {
      font-size: 1.4rem;
    }

    @media screen and (max-width: $tablet) {
      font-size: 1.5rem;
    }
}

.cmd-table {
  grid-area: 2 / 2 / 3 / 3;
}

table {
    table-layout: fixed;
    box-sizing: border-box;
    border: 2px solid $gray-8;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    max-width: 701px;

    @media screen and (max-width: $mobile) {
      width: 90vw;
    }

}

th {
    font-weight: bold;
}

th, td {
    padding: 0.5rem;
}

.copied-msg {
  position: fixed;
  top: 30px;
  left: auto;
  right: auto;
  z-index: 995;
  transform: translateY(-50%);
  background-color: $yellow;
  color: rgb(32,33,35);
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
}

.cmd {
    width: 200px;
    overflow-wrap: break-word;

    @media screen and (max-width: $tablet) {
      width: 112px;
      padding-right: 12px;
      padding-left: 4px;
    }
}

.val {
    width: 340px;
    max-width: 427px;
    overflow-wrap: break-word;
    padding-right: 40px;
    padding-left: 40px;
    border-left: 2px solid $gray-8;
    text-align: left;

    @media screen and (max-width: $tablet) {
      width: 37vw;
      min-width: 140px;
      padding-left: 16px;
      line-height: 16px;
    }
}

td {
    padding: 12px 0;
    text-align: center;
    vertical-align: middle;
    border-top: 2px solid $gray-8;
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
