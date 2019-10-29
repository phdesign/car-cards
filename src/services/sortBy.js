function yearAsc(a, b) {
  if (a.year < b.year) {
    return -1;
  }
  if (a.year > b.year) {
    return 1;
  }
  return 0;
}

function yearDesc(a, b) {
  return yearAsc(b, a);
}

export default { yearAsc, yearDesc };
