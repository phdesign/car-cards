const criteria = {
  YEAR: "year",
  MAKE: "make",
  PRICE: "price"
};

const direction = {
  ASC: "asc",
  DESC: "desc"
};

const noSort = () => 0;

function sortBy(criteriaValue, directionValue) {
  if (!criteriaValue) {
    return noSort;
  }
  return (a, b) => {
    if (directionValue === direction.DESC) {
      const c = a;
      a = b;
      b = c;
    }
    if (a[criteriaValue] < b[criteriaValue]) {
      return -1;
    }
    if (a[criteriaValue] > b[criteriaValue]) {
      return 1;
    }
    return 0;
  };
}

export default { sortBy, criteria, direction };
