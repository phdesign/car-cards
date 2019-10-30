import SavedItems from "../data/savedItems";
import ExtendedInfo from "../data/extendedInfo";

class CachedCarService {
  getCars() {
    return SavedItems.savedItemCards.map(item => this.getCar(item));
  }

  getCar(item) {
    const url = item.action.url;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const titleParts = item.title.split(" ");
    return {
      id: id,
      url: "https://www.carsales.com.au" + item.action.url,
      title: item.title,
      adType: item.adType,
      photoUrl: item.photoUrl,
      price: item.price,
      year: titleParts[0],
      make: titleParts[1],
      extendedInfo: {}
    };
  }

  getExtendedInfo(cars) {
    const extendedInfoList = cars.map(car => {
      const extendedInfo = ExtendedInfo.find(x => x.id === car.id);
      return extendedInfo || { id: car.id, extendedInfo: {} };
    });
    return extendedInfoList;
  }
}

export default CachedCarService;
