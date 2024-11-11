
const {generateInvesterHolding} = require("../src/utils/generateInvesterHolding")

describe("generateInvesterHolding", () => {
  it("should generate correct CSV output", () => {
    const investments = [
      {
        firstName: "Billy",
        lastName: "Bob",
        investmentTotal: 10000,
        holdings: [{id: "1", investmentPercentage: 0.5}, {id: "2", investmentPercentage: 0.5}],
      },
      {
        firstName: "Sheila",
        lastName: "Aussie",
        investmentTotal: 20000,
        holdings: [{id: "1", investmentPercentage: 0.3}, {id: "2", investmentPercentage: 0.7}],
      },
    ]

    const companiesMap = {
      "1": "Company A",
      "2": "Company B",
    }

    const expectedCSVOutput = "Name|Date|Holding|Value\n" +
                                   "Billy Bob|undefined|Company A|5000.00\n" +
                                   "Billy Bob|undefined|Company B|5000.00\n" +
                                   "Sheila Aussie|undefined|Company A|6000.00\n" +
                                   "Sheila Aussie|undefined|Company B|14000.00\n"

    const result = generateInvesterHolding(investments, companiesMap)
    console.log("Result:", result)
    console.log("Expected:", expectedCSVOutput)
    expect(result).toBe(expectedCSVOutput)
  })
})
