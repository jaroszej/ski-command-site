const axios = require('axios')

const apiKey = process.env.MONGO_API_KEY
const baseUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/data-npueo/endpoint/data/v1/action/'

// config to grab all commands from skimmands > skimmands > commands using 'find'
// returns only key, value
const configGetAll = {
  method: 'post',
  url: baseUrl + 'find',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': apiKey,
    Accept: 'application/ejson'
  },
  data: JSON.stringify({
    collection: 'commands',
    database: 'skimmands',
    dataSource: 'skimmands',
    projection: {
      _id: 0,
      key: 1,
      value: 1
    }
  })
}

export async function getCommands () {
  await axios(configGetAll)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      return response.data
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
}
