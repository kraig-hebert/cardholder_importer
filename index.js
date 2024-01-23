const fs = require('fs');

const buildCardholder = (cardholderData) => {
  return {
    fName: cardholderData[3],
    lName: cardholderData[4],
    credentials: cardholderData[5],
    groups: cardholderData[6],
  };
};

// Function to parse CSV data
function parseCSV(csvData) {
  const rows = csvData.split('\n');
  const parsedData = [];

  rows.forEach((row) => {
    const cardholder = row.split(',');
    parsedData.push(buildCardholder(cardholder));
  });
  parsedData.shift();
  parsedData.pop();

  return parsedData;
}

// Read CSV file
const filePath = 'files/Belchertown Schools_Cardholders_partial_test.csv';
const csvData = fs.readFileSync(filePath, 'utf8');

// Parse CSV data into cardholders
const cardHolders = parseCSV(csvData);

const csvHeader =
  'Email,First Name,Last Name,Card Type,Card Format,Use For Gateway,Facility Code,Card ID,Card Start Date,Remote Unlock,Portal Access, Send Setup Email,Access groups\n';
const buildImportCSV = (cardholderList) => {
  let csvData = '';
  csvData += csvHeader;

  const cardType = 'WIEGAND';
  const cardFormat = 'prox26std';
  const useForGateway = 'FALSE';
  const facilityCode = '16';
  //cardId = i get this
  const cardStart = '2024-01-19T07:00:00.000Z';
  const remoteUser = 'FALSE';
  const portalAccess = 'FALSE';
  const sendSetupEmail = 'FALSE';
  //accessGroups = i get this
  console.log(cardholderList);

  cardholderList.forEach((cardholder) => {
    const email = `${cardholder.fName.charAt(0)}${
      cardholder.lName
    }@belchertownps.org`;

    csvData += `${email},${cardholder.fName},${cardholder.lName},${cardType},${cardFormat},${useForGateway},${facilityCode},100,${cardStart},${remoteUser},${portalAccess},${sendSetupEmail}\n`;
  });

  console.log(csvData);
  return csvData;
};

// Display parsed data
// cardHolders.forEach((cardHolder) => console.log(cardHolder.fName));

const outputCSV = buildImportCSV(cardHolders);

// Write the modified CSV data to a new file
const outputFilePath = 'files/exportDump.csv';
fs.writeFileSync(outputFilePath, outputCSV, 'utf8');
