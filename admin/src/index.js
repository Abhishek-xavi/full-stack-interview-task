const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const {generateReport} = require("./controllers/reportController")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
})

app.get("/generate-csv", (req, res) => {
  generateReport(csvData => {
    // Post CSV data to investments service
    request.post({
      url: `${config.investmentsServiceUrl}/investments/export`,
      json: {csv: csvData},
      headers: {"Content-Type": "application/json"},
    }, (err) => {
      if (err) {
        console.error("Error exporting CSV:", err)
        return res.status(500).send("Error exporting CSV")
      }
      res.type("text/csv").send(csvData)
    })
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
