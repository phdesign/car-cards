import SavedItems from "./data/saved-items";
import ExtendedInfo from "./data/extended-info";

class CarData {
  constructor() {
    this.items = [];
    this.byYearAsc = this.byYearAsc.bind(this);
    this.byYearDesc = this.byYearDesc.bind(this);
  }

  load() {
    const extendedInfoLookup = ExtendedInfo.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
    this.items = SavedItems.savedItemCards.map(item => {
      const url = item.action.url;
      const id = url.substring(url.lastIndexOf("/") + 1);
      const extInfo = extendedInfoLookup[id] || {};
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
        odometer: extInfo.odometer,
        engine: extInfo.engine,
        powerToWeight: extInfo.powerToWeight,
        economy: extInfo.economy
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
