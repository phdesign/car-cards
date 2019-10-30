import React from "react";
import sorted from "../../services/sorted";

class SortBy extends React.Component {
  constructor() {
    super();

    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangeSortDirection = this.handleChangeSortDirection.bind(this);
  }

  handleChangeSortBy(event) {
    event.preventDefault();
    this.props.onChangeSortBy(event.target.value);
  }

  handleChangeSortDirection(event) {
    event.preventDefault();
    this.props.onChangeSortDirection(event.target.value);
  }

  render() {
    return (
      <>
        <select onChange={this.handleChangeSortBy} value={this.props.value}>
          <option value="">Sort by</option>
          {Object.values(sorted.criteria).map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          onChange={this.handleChangeSortDirection}
          value={this.props.value}
        >
          <option value="">Sort direction</option>
          {Object.values(sorted.direction).map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </>
    );
  }
}

export default SortBy;
