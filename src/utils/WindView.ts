import { error } from 'src/constants/WindView';
import cardinalPointsList from './cardinalPoints';

export default class WindView {
  private _windDirection: number;
  private _errorCallback: (error: string) => void;

  constructor(
    direction: number | string,
    errorCallback: (error: string) => void
  ) {
    this._windDirection = Number(direction);
    this._errorCallback = errorCallback;

    if (this._windDirection < 0) {
      this._errorCallback(error.negativeDegrees);
    } else if (this._windDirection > 360) {
      this._errorCallback(error.maximumDegrees);
    }
  }

  private get _nearestCardinalPoint() {
    const deg = this._windDirection;
    for (let [degree, cardinalPoint] of cardinalPointsList) {
      if (deg < degree - 22.5 || deg < degree + 22.5) {
        return cardinalPoint;
      }
    }
  }

  public get windDirection() {
    return this._windDirection;
  }

  public get cardinal() {
    for (let cardinalTuple of cardinalPointsList) {
      const [degrees, cardinalPoint] = cardinalTuple;
      if (degrees === this._windDirection) {
        return cardinalPoint;
      } else return this._nearestCardinalPoint;
    }
  }
}
