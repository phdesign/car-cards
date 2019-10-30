import React from "react";
import "./CardHeader.scss";

class CardHeader extends React.Component {
  render() {
    const { image, category } = this.props;
    const style = {
      backgroundImage: "url(" + image + ")"
    };
    return (
      <header style={style} className="CardHeader">
        <h4 className="CardHeader-title">{category}</h4>
      </header>
    );
  }
}

export default CardHeader;
