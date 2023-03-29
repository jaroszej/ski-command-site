<template>
  <div class="content">
    <div v-if="mongoErr" class="err">
      <h2>Server Error</h2>
      <h3>Try again later</h3>
      <div class="wiggle">
        <img src="../assets/img/skiestWiggle.gif" alt="skiestWiggle gif">
      </div>
    </div>
    <div v-else class="ok">
      <img class="rocky" src="../assets/img/rockyCool.png" alt="rockyCool twitch emote" width="150">
      <h1 class="title">
        Skimmands
      </h1>
      <table>
        <thead>
          <tr>
            <th class="cmd">
              Command
            </th>
            <th class="val">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="command in getCleanCommands" :key="command.key">
            <td class="cmd">
              !{{ command.key }}
            </td>
            <td class="val">
              {{ command.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SkiestiCommands',
  data () {
    return {
      mongoErr: false
    }
  },
  computed: {
    ...mapGetters(['getCommands']),
    ...mapState(['checkMongoErr']),
    getCleanCommands () {
      return this.getCommands
    }
  },
  watch: {
    checkMongoErr () {
      this.mongoErr = this.$store.dispatch('getMongoErr')
    }
  },
  async mounted () {
    // call data from stored value
    this.commands = await this.$store.dispatch('mongoGetCommands')
    // then update values every 15 minutes
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&family=Sofia+Sans+Extra+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Titan+One&display=swap');

.content {
    text-align: center;
}

.rocky {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

table {
    border: 2px solid rgb(121, 121, 121);
    border-radius: 8px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

th {
    font-weight: bold;
}

.title {
    font-family: 'Sofia Sans Extra Condensed', Arial, Helvetica, sans-serif, sans-serif;
}

.cmd {
    width: 30%;
    font-size: 16pt;
}

.val {
    width: 70%;
    border-left: 2px solid rgb(121, 121, 121);
    font-size: 16pt;
}

td {
    padding: 10px;
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
