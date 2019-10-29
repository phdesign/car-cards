import React from "react";
import Card from "../Card";
import "./CardList.scss";
import DownloadButton from "../DownloadButton";
import CarService from "../../services/cachedCarService";
import SortBy from "../../services/sortBy";

class CardList extends React.Component {
  constructor() {
    super();

    this.state = {
      cars: [],
      sortBy: SortBy.yearAsc
    };
  }

  async componentDidMount() {
    const carService = new CarService();
    const cars = await carService.getCars();
    this.setState({
      cars: cars.filter(i => i.make === "Mercedes-Benz")
    });

    const results = await carService.getExtendedInfo(cars);
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
      <div>
        <DownloadButton cars={this.state.cars} />
        <div className="CardList">
          {Object.keys(cars).map(key => (
            <Card key={key} index={key} details={cars[key]} />
          ))}
        </div>
      </div>
    );
  }
}

export default CardList;
