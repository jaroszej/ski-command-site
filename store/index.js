import * as Realm from 'realm-web'

export const state = () => ({
  commands: {},
  mongoErr: false
})

export const getters = {
  getCommands (state) {
    return state.commands
  },
  getMongoErr (state) {
    return state.mongoErr
  }
}

// async
export const actions = {
  // populates data on app launch
  async mongoGetCommands ({ commit, state }) {
    const app = new Realm.App({ id: 'data-npueo' })
    const credentials = Realm.Credentials.anonymous()
    try {
      const user = await app.logIn(credentials)
      // returns ejson obj of commands
      const comms = await user.functions.getCommands()

      if (comms.result.code === '0') {
        const commands = comms.result.data
        commit('cleanData', commands)
      } else {
        // eslint-disable-next-line no-console
        console.error('Invalid query... Sad mongo')
      }
    } catch (err) {
      state.mongoErr = true
      // eslint-disable-next-line no-console
      console.error('Failed to log in', err)
    }

    // Schedule the action to run again in 15 minutes (900,000 ms)
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('got commands', state.commands)
      this.dispatch('mongoGetCommands')
    }, 900000)
  }
}

// sync
export const mutations = {
  cleanData (state, commands) {
    state.mongoErr = false
    const cleanCommands = commands.map(({ key, value }) => ({ key, value }))

    state.commands = []
    state.commands.push(...cleanCommands)
  }

}
