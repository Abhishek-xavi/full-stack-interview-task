const request = require("request")
const config = require("config")
const {generateInvesterHolding} = require("../utils")

// Function to fetch company data from the financial companies API
const fetchCompanies = (callback) => {
  request.get(`${config.companiesServiceUrl}/companies`, (error, response, body) => {
    if (error) {
      console.error("Error fetching company data:", error)
      return callback([])
    }
    const companies = JSON.parse(body)
    callback(companies)
  })
}

// Function to fetch investments data from the investments API
const fetchInvestments = (callback) => {
  request.get(`${config.investmentsServiceUrl}/investments`, (error, response, body) => {
    if (error) {
      console.error("Error fetching investments data:", error)
      return callback([])
    }
    const investments = JSON.parse(body)
    callback(investments)
  })
}

// Main function to orchestrate fetching and generating report
const generateReport = (callback) => {
  fetchCompanies(companies => {
    // Create a map of company IDs to names for quick lookup
    const companiesMap = {}
    companies.forEach(company => {
      companiesMap[company.id] = company.name
    })

    fetchInvestments(investments => {
      // Generate CSV report using fetched investments and companies map
      const csvReport = generateInvesterHolding(investments, companiesMap)
      console.log(csvReport)
      callback(csvReport)
    })
  })
}

module.exports = {generateReport}
