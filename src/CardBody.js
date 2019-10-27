import React from "react";

class CardBody extends React.Component {
  render() {
    const odometerString = this.props.details.odometer
      ? this.props.details.odometer.toLocaleString() + " km"
      : null;
    const powerToWeightString = this.props.details.powerToWeight
      ? this.props.details.powerToWeight + " kW/t"
      : null;
    const economyString = this.props.details.economy
      ? this.props.details.economy + " L/100km"
      : null;
    return (
      <div className="card-body">
        <p className="date">
          <a
            href={"https://www.carsales.com.au" + this.props.details.url}
            className="body-link"
          >
            <i className="fa fa-external-link"></i>
          </a>
          {this.props.details.id}
        </p>
        <h2>{this.props.details.title}</h2>

        <p className="body-content">
          {[
            this.props.details.price,
            odometerString,
            this.props.details.engine,
            powerToWeightString,
            economyString
          ].reduce((result, item) => (item ? [result, <br />, item] : result))}
        </p>
      </div>
    );
  }
}

export default CardBody;
