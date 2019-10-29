import React from "react";
import CarService from "../../services/remoteCarService";

class DownloadButton extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const carService = new CarService();
    carService
      .getExtendedInfo(this.props.cars)
      .then(items =>
        this.downloadFile(
          "extendedInfo.json",
          JSON.stringify(items, null, "  ")
        )
      );
  }

  downloadFile(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Download Extended Info
      </button>
    );
  }
}

export default DownloadButton;
