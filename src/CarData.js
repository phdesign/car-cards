class CarData {
  constructor() {
    this.items = [];
    this.byYearAsc = this.byYearAsc.bind(this);
    this.byYearDesc = this.byYearDesc.bind(this);
  }

  load() {
    const carData = JSON.parse(document.getElementById("carData").innerHTML);
    const extendedData = JSON.parse(
      document.getElementById("extendedData").innerHTML
    );
    const extendedDataLookup = extendedData.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
    this.items = carData.savedItemCards.map(item => {
      const url = item.action.url;
      const id = url.substring(url.lastIndexOf("/") + 1);
      const extData = extendedDataLookup[id] || {};
      const titleParts = item.title.split(" ");
      return {
        id: id,
        url: item.action.url,
        title: item.title,
        adType: item.adType,
        photoUrl: item.photoUrl,
        price: item.price,
        year: titleParts[0],
        make: titleParts[1],
        odometer: extData.odometer,
        engine: extData.engine,
        powerToWeight: extData.powerToWeight,
        economy: extData.economy
      };
    });

    return this;
  }

  sortByYearAsc() {
    this.items = this.items.sort(this.byYearAsc);
    return this;
  }

  sortByYearDesc() {
    this.items = this.items.sort(this.byYearDesc);
    return this;
  }

  byYearAsc(a, b) {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  }

  byYearDesc(a, b) {
    return this.byYearAsc(b, a);
  }
}

export default CarData;
