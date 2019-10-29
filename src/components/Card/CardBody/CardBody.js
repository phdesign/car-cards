import React from "react";
import "./CardBody.scss";

class CardBody extends React.Component {
  render() {
    const odometerString = this.props.details.extendedInfo.odometer
      ? this.props.details.extendedInfo.odometer.toLocaleString() + " km"
      : null;
    const powerToWeightString = this.props.details.extendedInfo.powerToWeight
      ? this.props.details.extendedInfo.powerToWeight + " kW/t"
      : null;
    const economyString = this.props.details.extendedInfo.economy
      ? this.props.details.extendedInfo.economy + " L/100km"
      : null;
    return (
      <div className="CardBody">
        <div className="CardBody-id">
          <a
            href={this.props.details.url}
            target="_blank"
            rel="noopener noreferrer"
            className="CardBody-link"
          >
            <i className="fa fa-external-link"></i>
          </a>
          {this.props.details.id}
        </div>
        <h2>{this.props.details.title}</h2>

        <div className="CardBody-content">
          {[
            this.props.details.price,
            odometerString,
            this.props.details.extendedInfo.engine,
            powerToWeightString,
            economyString
          ].map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default CardBody;
