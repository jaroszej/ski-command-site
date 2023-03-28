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
import { configGetAll } from '../database/db'

export default {
  name: 'SkiestiCommands',
  data () {
    return {
      commands: {}
    }
  },
  async mounted () {
    await axios(configGetAll)
      .then(function (response) {
      // eslint-disable-next-line no-console
        console.log('mongo res:', JSON.stringify(response))
        this.commands = response.data
      })
      .catch(function (error) {
      // eslint-disable-next-line no-console
        console.log('mongo err:', error)
        return error
      })
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
        border-left: 2px solid rgb(0,0,0);
    }

    td {
        padding: 10px;
        text-align: center;
        vertical-align: middle;
        border-top: 2px solid rgb;
    }
</style>
