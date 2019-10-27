import React from "react";
import Card from "../Card";
import "./CardList.scss";
import SavedItems from "../../data/saved-items";
import ExtendedInfo from "../../data/extended-info";

class CardList extends React.Component {
  constructor() {
    super();

    this.byYearAsc = this.byYearAsc.bind(this);
    this.byYearDesc = this.byYearDesc.bind(this);
    this.state = {
      cars: {},
      sortBy: null
    };
  }

  componentWillMount() {
    const cars = this.loadCars().filter(i => i.make === "Mercedes-Benz");
    this.setState({
      cars: cars,
      sortBy: this.byYearDesc
    });
  }

  render() {
    const cars = this.state.sortBy
      ? this.state.cars.sort(this.state.sortBy)
      : this.state.cars;
    return (
      <div className="CardList">
        {Object.keys(cars).map(key => (
          <Card key={key} index={key} details={cars[key]} />
        ))}
      </div>
    );
  }

  loadCars() {
    const extendedInfoLookup = ExtendedInfo.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
    return SavedItems.savedItemCards.map(item =>
      this.getCar(item, extendedInfoLookup)
    );
  }

  getCar(info, extendedInfoLookup) {
    const url = info.action.url;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const extendedInfo = extendedInfoLookup[id] || {};
    const titleParts = info.title.split(" ");
    return {
      id: id,
      url: info.action.url,
      title: info.title,
      adType: info.adType,
      photoUrl: info.photoUrl,
      price: info.price,
      year: titleParts[0],
      make: titleParts[1],
      odometer: extendedInfo.odometer,
      engine: extendedInfo.engine,
      powerToWeight: extendedInfo.powerToWeight,
      economy: extendedInfo.economy
    };
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

export default CardList;
