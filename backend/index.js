const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Server is running')
})

app.post('/api/generaterss', (req, res) => {
  const payload = req.body

  let itemData = ''

  const event = new Date()

  for (let i = 0; i <= payload.length - 1; i++) {
    itemData = (itemData + `
      <item>
        <title>${payload[i].Currency}</title>
        <link>https://kwftbank.com</link>
        <description>${payload[i].Currency} Buy: ${payload[i].Buy}, Sell: ${payload[i].Sell}, Mean: ${payload[i].Mean}</description>
        <pubDate>${event.toUTCString()}</pubDate>
      </item>
    `).trim()
  }

  let rssFeed =
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version = "2.0">
      <channel>
        <title>KWFT Forex Rates</title>
        <link>https://kwftbank.com</link>
        <description>KWFT Forex Ticker</description>
        <language>en-us</language>
        <pubDate>${event.toUTCString()}</pubDate>
        <lastBuildDate>${event.toUTCString()}</lastBuildDate>
        <docs>https://kwftbank.com</docs>
        <generator>CSV-RSS Generator 2.0</generator>
        <managingEditor>info@rhodium.co.ke (Rhodium Digital Services)</managingEditor>
        <webMaster>info@rhodium.co.ke (Rhodium Digital Services)</webMaster>
        ${itemData}
      </channel>
    </rss>`

  fs.writeFile('../rss/feed.xml', rssFeed.trim(), 'utf8', function (err) { console.log(err) })

  console.log('File created: ', Date())

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api`)
})
