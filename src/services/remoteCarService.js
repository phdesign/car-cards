import cheerio from "cheerio";

class RemoteCarService {
  getExtendedInfo(cars) {
    const promises = cars.map(car =>
      this.fetchExtendedInfo(car).catch(error => {
        console.warn(error);
        return {};
      })
    );
    return Promise.all(promises);
  }

  async fetchExtendedInfo(car) {
    const res = await fetch(car.url);
    const $ = cheerio.load(await res.text());
    const odometer = this.parseNumber(
      $(".features-item-value-kilometers")
        .first()
        .text()
    );
    const engine = $(".features-item-value-engine")
      .first()
      .text()
      .trim();
    const economy = this.parseNumber(
      $(".features-item-value-fuel-consumption-combined")
        .first()
        .text()
    );
    const powerToWeight = this.parseNumber(
      $(".features-item-value-power-to-weight-ratio")
        .first()
        .text()
    );
    return {
      id: car.id,
      extendedInfo: { odometer, engine, economy, powerToWeight }
    };
  }

  parseNumber(text) {
    return parseFloat(text.replace(/,/g, ""));
  }
}

export default RemoteCarService;
