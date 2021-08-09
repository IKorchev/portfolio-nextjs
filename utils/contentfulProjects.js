const space = process.env.CONTENTFUL_SPACE
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const apiKey = process.env.CONTENTFUL_API_KEY
const client = require("contentful").createClient({
  space,
  accessToken,
})

export const fetchContentfulData = async () => {
  const data = await client.getEntries(apiKey)
  const items = data.items.map((el) => el.fields)
  const filteredItems = items.filter((el) => !el.drawing)
  return filteredItems
}
