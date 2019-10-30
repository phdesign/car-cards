import React from "react";

class FilterByMake extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange} value={this.props.value}>
        <option value="">Filter by make</option>
        {["Mercedes-Benz", "BMW", "Audi"].map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}

export default FilterByMake;
