const apiKey = process.env.BEARER_KEY
const collection = process.env.COLLECTION
const db = process.env.DB
const ds = process.env.DS
const baseUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/data-npueo/endpoint/data/v1/action/'

// config to grab all commands from skimmands > skimmands > commands using 'find'
// returns only key, value
export const configGetAll = {
  method: 'post',
  url: baseUrl + 'find',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
    Accept: 'application/ejson'
  },
  data: JSON.stringify({
    collection,
    database: db,
    dataSource: ds,
    projection: {
      _id: 0,
      key: 1,
      value: 1
    }
  })
}
