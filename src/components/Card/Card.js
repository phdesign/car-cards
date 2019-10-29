import React from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import "./Card.scss";

function Card(props) {
  return (
    <article className="Card">
      <CardHeader
        category={props.details.adType}
        image={props.details.photoUrl}
      />
      <CardBody details={props.details} />
    </article>
  );
}

export default Card;
