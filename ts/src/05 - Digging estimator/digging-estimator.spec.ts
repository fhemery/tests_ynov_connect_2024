import { DiggingEstimator } from "./digging-estimator";

class DiggingEstimatorOverload extends DiggingEstimator {
  private rates = [0, 3, 5.5, 7];
  override get() : number[] {
    return this.rates;
  }

  setRates(rates: number[]) {
    this.rates = rates;
  }
}

describe("digging estimator", () => {

  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimatorOverload();

    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

  it("should work in Limestone as Dr Pockovsky said", () => {
    const estimator = new DiggingEstimatorOverload();
    estimator.setRates([0, 5, 9, 12]);

    const result = estimator.tunnel(28, 2, "limestone");

    expect(result.total).toBe(36);
  });
});
