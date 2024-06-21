import {DiggingEstimator, DiggingRateProvider, VinDiggingRateProvider} from "./digging-estimator";

class FakeDiggingRateProvider implements DiggingRateProvider {
    get(rockType: string): number[] {
        return [0, 3, 5.5, 7];
    }
}

describe("digging estimator", () => {

  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator(new FakeDiggingRateProvider());

    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

});
