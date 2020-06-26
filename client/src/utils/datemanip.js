const dateConverter = (date) => {
  const dt = new Date(date);

  return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
}

export default dateConverter;