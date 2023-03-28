<template>
  <div>
    <h1>Skimmands</h1>
    <table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="command in commands" :key="command.key">
          <td>{{ command.key }}</td>
          <td>{{ command.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCommands } from '../database/db'

export default {
  name: 'SkiestiCommands',
  data () {
    return {
      commands: {}
    }
  },
  async created () {
    this.commands = await getCommands()
  }
}
</script>
