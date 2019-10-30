import React from "react";
import Card from "../Card";
import "./CardList.scss";

function CardList(props) {
  return (
    <div>
      <div className="CardList">
        {props.cars.map(car => (
          <Card key={car.id} index={car.id} details={car} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
