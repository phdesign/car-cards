import React from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardHeader
          category={this.props.details.adType}
          image={this.props.details.photoUrl}
        />
        <CardBody details={this.props.details} />
      </article>
    );
  }
}

export default Card;
