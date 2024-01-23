const fs = require("fs");
const builder = require("./modules/builder");

const csvHeader =
  "Email,First Name,Last Name,Card Type,Card Format,Use For Gateway,Facility Code,Card ID,Card Start Date,Remote Unlock,Portal Access, Send Setup Email,Access groups\n";
const cardType = "WIEGAND";
const cardFormat = "prox26std";
const useForGateway = "FALSE";
const facilityCode = "16";
const cardStart = "2024-01-19T07:00:00.000Z";
const remoteUser = "FALSE";
const portalAccess = "FALSE";
const sendSetupEmail = "FALSE";

// Read CSV file
const filePath = "files/Belchertown Schools_Cardholders.csv";
const csvData = fs.readFileSync(filePath, "utf8");

// Function to parse CSV data to a list of objects
function parseCSV(csvData) {
  const rows = csvData.split("\n");
  const parsedData = rows.map((row) => builder.buildCardholder(row.split(",")));
  parsedData.shift();
  parsedData.pop();

  return parsedData;
}

// create csv string for output
const buildOutputCSV = (cardholderList) => {
  let csvData = "";
  csvData += csvHeader;

  cardholderList.forEach((cardholder) => {
    const emailWithSpaces = `${cardholder.fName.charAt(0)}${
      cardholder.lName
    }@belchertownps.org`;
    const email = emailWithSpaces.split(" ").join("");

    const activeCards = builder.getActiveCardNumbers(cardholder.credentials);
    const accessGroups = builder.getAccessGroups(cardholder.groups);

    activeCards.forEach((card) => {
      csvData += `${email},${cardholder.fName},${cardholder.lName},${cardType},${cardFormat},${useForGateway},${facilityCode},${card[0]},${cardStart},${remoteUser},${portalAccess},${sendSetupEmail},"${accessGroups}"\n`;
    });
  });

  return csvData;
};

const outputCSV = buildOutputCSV(parseCSV(csvData));

// Write the modified CSV data to a new file
const outputFilePath = "files/exportDump.csv";
fs.writeFileSync(outputFilePath, outputCSV, "utf8");
