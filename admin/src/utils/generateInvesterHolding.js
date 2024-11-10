// Function to generate CSV string from investments data
const generateInvesterHolding = (investments, companiesMap) => {
  const csvRows = []

  // Add header row
  csvRows.push("Name|Date|Holding|Value")

  investments.forEach(investment => {
    const {firstName, lastName, investmentTotal, date, holdings} = investment
    const fullName = `${firstName} ${lastName}`

    holdings.forEach(holding => {
      const holdingId = holding.id
      const investmentPercentage = holding.investmentPercentage
      const value = (investmentTotal * investmentPercentage).toFixed(2)
      const holdingName = companiesMap[holdingId] || "Unknown Holding"

      // Add row to CSV
      csvRows.push(`${fullName}|${date}|${holdingName}|${value}`)
    })
  })

  return csvRows.join("\n")
}

module.exports = {generateInvesterHolding}
