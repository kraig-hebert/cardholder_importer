const accessGroupNames = {
  'All Doors 24/7 Access': 'All Sites All Doors 24/7',
  'All Doors Daytime': 'All Sites All Doors Daytime',
  'All Front Doors Daytime': 'All Sites All Front Doors Daytime',
  'Assitant Principal': 'Assistant Principal',
  'BHS 24/7': 'BHS - All Doors 24/7',
  'BHS All Doors Daytime': 'BHS - All Doors Daytime',
  'BHS Breakfast': 'BHS - Breakfast',
  'BHS Ev/Wkend': 'BHS - Ev/Wkend',
  'BHS Paras': 'BHS - Paras',
  'BHS Teachers': 'BHS - Teachers',
  'Building Contractor': 'Building Contractor',
  'CHCS 24/7': 'CHC - All Doors 24/7',
  'CHCS All Doors Daytime': 'CHC - All Doors Daytime',
  'CHCS Daytime': 'CHC - Daytime',
  'CHCS Ev/Wkend': 'CHC - Ev/Wkend',
  'CHCS Kitchen': 'CHC - Kitchen',
  'CHCS Lunch/Recess Paras': 'CHC - Lunch/Recess Paras',
  'CHCS Paras': 'CHC - Paras',
  'CHCS Teachers': 'CHC - Teachers',
  'CSS 24/7': 'CSS - All Doors 24/7',
  'CSS All Doors Daytime': 'CSS - All Doors Daytime',
  'CSS Breakfast': 'CSS - Breakfast',
  'CSS Paras': 'CSS - Paras',
  'CSS Teachers': 'CSS - Teachers',
  'CSS Wk/Eve': 'CSS - Wk/Eve',
  'Central Office - Office Hours': 'BCO - Office Hours',
  'Central Office Staff': 'BCO - Staff',
  'Central office 24/7': 'BCO - All Doors 24/7',
  'JBMS 24/7': 'JBM - All Doors 24/7',
  'JBMS Kitchen': 'JBM - Kitchen',
  'JBMS Teachers': 'JBM - Teachers',
  'Jabish Daytime': 'JBM - Daytime',
  'Jabish Paras': ' JBM - Paras',
  Principal: 'Principal',
  'SRE 24/7': 'SRE - All Doors 24/7',
  'SRE All Doors Daytime': 'SRE - All Doors Daytime',
  'SRE Breakfast': 'SRE - Breakfast',
  'SRE Daytime': 'SRE - Daytime',
  'SRE Lunch/Recess Paras': 'SRE - Lunch/Recess Paras',
  'SRE Paras': 'SRE - Paras',
  'SRE Teachers': 'SRE - Teachers',
  'SRE Wk/Eve': 'SRE - Wk/Eve',
  'Van Driver': 'Van Driver',
};

const buildCardholder = (cardholderData) => {
  return {
    fName: cardholderData[3],
    lName: cardholderData[4],
    credentials: cardholderData[5],
    groups: cardholderData[6],
  };
};

const getActiveCardNumbers = (cardDataList) => {
  cardDataList = cardDataList.replace(new RegExp('{', 'g'), '');
  cardDataList = cardDataList.replace(new RegExp('}', 'g'), '');
  const cards = cardDataList.split('|');
  return cards
    .map((card) => {
      return card.split('~');
    })
    .filter((card) => card[3] === 'Active');
};

const getAccessGroups = (accessGroupList) => {
  accessGroupList = accessGroupList.replace(new RegExp('{', 'g'), '');
  accessGroupList = accessGroupList.replace(new RegExp('}', 'g'), '');
  const accessGroups = accessGroupList.split('|');
  const newAccessGroups = accessGroups.map((accessGroup) => {
    return accessGroup.split('~');
  });

  const newAccessGroupList = [];
  let newAccessGroupString = '';

  newAccessGroups.forEach((group) => {
    newAccessGroupList.push(accessGroupNames[group[0]]);
  });
  newAccessGroupString = newAccessGroupList.join(',');

  return newAccessGroupString;
};

module.exports = { buildCardholder, getActiveCardNumbers, getAccessGroups };
