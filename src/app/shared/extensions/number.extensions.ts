export {};

declare global {
  interface Number {
    round: (places: number) => number;
  }
}

Number.prototype.round = function (places: number) {
  return +this.toFixed(places);
};
