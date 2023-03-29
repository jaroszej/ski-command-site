<template>
  <div class="content">
    <h1>Skimmands</h1>
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
        <tr v-for="command in commands" :key="command.key">
          <td class="cmd">
            {{ command.key }}
          </td>
          <td class="val">
            {{ command.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SkiestiCommands',
  data () {
    return {
      commands: {}
    }
  },
  async mounted () {
    const data = JSON.stringify({
      collection: 'commands',
      database: 'skimmands',
      dataSource: 'skimmands',
      projection: {
        _id: 0,
        key: 1,
        value: 1
      }
    })
    const head = {
      'Content-Type': 'application/json',
      'api-key': 'TJyJRZitkR8jukch2mn1JFO8A9LVdBsVMsbkq1KRqMAx22wd528ibJPiC4Kmx8Sz'
    }
    await axios.post('https://us-east-1.aws.data.mongodb-api.com/app/data-npueo/endpoint/data/v1/action/find', data, head)
  }
}
</script>

<style scoped>
.content {
    text-align: center;
}

table {
    border: 2px solid rgb(0, 0, 0);
    border-radius: 8px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

th {
    font-weight: bold;
}

.cmd {
    width: 30%;
}

.val {
    width: 70%;
    border-left: 2px solid rgb(0, 0, 0);
}

td {
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    border-top: 2px solid rgb;
}
</style>
