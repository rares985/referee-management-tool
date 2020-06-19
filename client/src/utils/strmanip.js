
const removeAccents = (str) => {
  const accentMap = { 'a': 'ă|â', 'i': 'î', 's': 'ș', 't': 'ț' }
  let accentLessString = str;

  Object.keys(accentMap).forEach(pattern => {
    accentLessString = accentLessString.replace(new RegExp(accentMap[pattern], 'g'), pattern);
  });

  return accentLessString;
};

export default removeAccents;