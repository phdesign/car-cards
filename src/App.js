import React from "react";
import CarData from "./CarData";
import Card from "./Card";
import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: {}
    };
  }

  componentWillMount() {
    const carData = new CarData().load();
    //.sortByYearDesc();
    const items = carData.items.filter(i => i.make === "Mercedes-Benz");
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-card-list">
          {Object.keys(this.state.items).map(key => (
            <Card key={key} index={key} details={this.state.items[key]} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
