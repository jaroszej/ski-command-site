<template>
  <div class="tooltip">
    <button class="button" @mouseover="showTooltip = true" @click="copyToClipboard(buttonText)">
      {{ buttonText }}
    </button>

    <div v-if="showTooltip" :class="{ 'tooltip-text': true, 'clicked': isClicked }">
      {{ isClicked ? updatedTooltipText : defaultTooltipText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipButton',
  props: {
    buttonText: {
      type: String,
      required: false,
      default: ''
    },
    defaultTooltipText: {
      type: String,
      required: false,
      default: 'Copy to clipboard'
    },
    clicked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      showTooltip: false,
      isClicked: false,
      template: '',
      updatedTooltipText: ''
    }
  },
  methods: {
    copyToClipboard (text) {
      this.isClicked = true
      this.template = `!${text}`
      this.updatedTooltipText = 'Copied ' + this.template
      navigator.clipboard.writeText(`!${text}`)
      setTimeout(() => {
        this.isClicked = false
        this.template = ''
      }, 1250)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/variables.scss';

  .button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    outline: inherit;
    display: inline;
    padding: 0;
    text-decoration: none;
    border-bottom: dashed 1px $gray-9;

    @media screen and (max-width: $mobile) {
      width: calc(100% + 5px);
      text-overflow: ellipsis;
    }
  }

  .button:hover {
    text-decoration: underline;
    text-decoration-color: $yellow;
  }

  .button:active {
    text-decoration: underline;
    text-decoration-color: $orange;
  }
  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: $yellow;
    color: #000;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  .clicked {
    background-color: $orange;
  }

</style>
