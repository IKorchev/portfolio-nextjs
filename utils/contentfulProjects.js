const client = require("contentful").createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const fetchContentfulData = async () => {
  const data = await client.getEntries(process.env.CONTENTFUL_API_KEY)
  const items = data.items.map((el) => el.fields)
  const filteredItems = items.filter((el) => !el.drawing)
  return filteredItems
}
