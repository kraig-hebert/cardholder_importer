const buildCardholder = (cardholderData) => {
  return {
    fName: cardholderData[3],
    lName: cardholderData[4],
    credentials: cardholderData[5],
    groups: cardholderData[6],
  };
};

const getActiveCardNumbers = (cardDataList) => {
  cardDataList = cardDataList.replace(new RegExp("{", "g"), "");
  cardDataList = cardDataList.replace(new RegExp("}", "g"), "");
  const cards = cardDataList.split("|");
  return cards
    .map((card) => {
      return card.split("~");
    })
    .filter((card) => card[3] === "Active");
};

const getAccessGroups = (accessGroupList) => {
  accessGroupList = accessGroupList.replace(new RegExp("{", "g"), "");
  accessGroupList = accessGroupList.replace(new RegExp("}", "g"), "");
  const accessGroups = accessGroupList.split("|");
  const newAccessGroups = accessGroups.map((accessGroup) => {
    return accessGroup.split("~");
  });

  const newAccessGroupList = [];
  let newAccessGroupString = "";

  newAccessGroups.forEach((group) => {
    newAccessGroupList.push(group[0]);
  });
  newAccessGroupString = newAccessGroupList.join(",");

  return newAccessGroupString;
};

module.exports = { buildCardholder, getActiveCardNumbers, getAccessGroups };
