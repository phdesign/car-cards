import React from "react";
import CardList from "../CardList";
import DownloadButton from "../DownloadButton";
import FilterByMake from "../FilterByMake";
import SortBy from "../SortBy";
import CarService from "../../services/cachedCarService";
import sorted from "../../services/sorted";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cars: [],
      sortBy: "",
      sortDirection: "",
      filterByMake: ""
    };
    this.handleChangeFilterByMake = this.handleChangeFilterByMake.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
  }

  componentDidMount() {
    const carService = new CarService();
    let cars = carService.getCars();
    const extendedInfo = carService.getExtendedInfo(cars);
    cars = cars.map(car =>
      Object.assign(
        {},
        car,
        extendedInfo.find(info => car.id === info.id) || {}
      )
    );

    this.setState({
      cars: cars
    });
  }

  handleChangeFilterByMake(value) {
    this.setState({
      filterByMake: value
    });
  }

  handleChangeSortBy(value) {
    this.setState({
      sortBy: value
    });
  }

  handleChangeSortDirection(value) {
    this.setState({
      sortDirection: value
    });
  }

  render() {
    let cars = this.state.cars;
    if (this.state.sortBy) {
      cars = this.state.cars.sort(
        sorted.sortBy(this.state.sortBy, this.state.sortDirection)
      );
    }
    if (this.state.filterByMake) {
      cars = cars.filter(i => i.make === this.state.filterByMake);
    }
    return (
      <div className="App">
        <DownloadButton cars={this.state.cars} />
        <FilterByMake
          value={this.state.filterByMake}
          onChange={this.handleChangeFilterByMake}
        />
        <SortBy
          value={this.state.sortBy}
          onChangeSortBy={this.handleChangeSortBy}
          onChangeSortDirection={this.handleChangeSortDirection}
        />
        <CardList cars={cars} />
      </div>
    );
  }
}

export default App;
