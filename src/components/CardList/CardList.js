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

  async componentDidMount() {
    const cars = this.fetchCars().filter(i => i.make === "Mercedes-Benz");
    this.setState({
      cars: cars,
      sortBy: null
    });

    const extendedInfoPromises = this.fetchExtendedInfo(cars).map(promise =>
      promise.catch(error => {
        console.warn(error);
        return {};
      })
    );
    const results = await Promise.all(extendedInfoPromises);
    var newCars = this.state.cars.map(car =>
      Object.assign({}, car, results.find(info => car.id === info.id) || {})
    );

    this.setState({
      cars: newCars
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

  fetchCars() {
    return SavedItems.savedItemCards.map(item => this.getCar(item));
  }

  getCar(item) {
    const url = item.action.url;
    const id = url.substring(url.lastIndexOf("/") + 1);
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
      extendedInfo: {}
    };
  }

  fetchExtendedInfo(cars) {
    return cars.map(car => {
      const extendedInfo = ExtendedInfo.find(x => x.id === car.id);
      if (extendedInfo) {
        return Promise.resolve({
          id: extendedInfo.id,
          extendedInfo: {
            odometer: extendedInfo.odometer,
            engine: extendedInfo.engine,
            powerToWeight: extendedInfo.powerToWeight,
            economy: extendedInfo.economy
          }
        });
      }
      return Promise.resolve({});
    });
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
