const addUpdateArray = (arr, matchid, key, value) => {
  const idx = arr.findIndex(elem => elem.matchid === matchid);
  let newArr = [];
  let newElem = {};

  if (idx !== -1) {
    /* Yes, element already in array, just update specified key */
    newElem = { ...arr[idx] };
    newElem[key] = value;

    newArr = [...arr.slice(0, idx), newElem, ...arr.slice(idx + 1, arr.length)];
  } else {
    /* No, element not in array */
    newElem.matchid = matchid;
    newElem[key] = value;
    newArr = [...arr, newElem]
  }
  return newArr;
};

export default addUpdateArray;