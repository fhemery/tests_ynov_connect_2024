import {CurrencyConverter} from "./currency-converter";
import {ConversionRateApi} from "./external/conversion-rate-api";
import {Currency} from "./model/currency";
import {Money} from "./model/money";
import {CurrencyIsoCode} from "./external/currency-iso-code";
import {IConversionRateApi} from "./i-conversion-rate-api";

// ARRANGE
const dollarToEuroConversionRate = 0.8;
const poundToEuroConversionRate = 1.2;

const defaultRate = 3;
interface Rate {
    source: CurrencyIsoCode;
    target: CurrencyIsoCode;
    rate: number;
}

class FakeConversionRateApi implements IConversionRateApi {
    private _rates: Rate[] = [];
    callsToGet: Rate[] = [];

    withRate(source: CurrencyIsoCode, target: CurrencyIsoCode, rate: number): FakeConversionRateApi {
        this._rates.push({source, target, rate});
        return this;
    }

    getRate(source: CurrencyIsoCode, target:CurrencyIsoCode): number {
        this.callsToGet.push({source, target, rate: 0});
        const rate = this._rates.find(r => r.source === source && r.target === target);
        return rate?.rate || defaultRate;
    }
}


describe("CurrencyConverter", function () {
    let converter: CurrencyConverter;
    let conversionRateApi: ConversionRateApi;

    beforeEach(() => {
        conversionRateApi = new ConversionRateApi();
        converter = new CurrencyConverter(conversionRateApi);
    })


    it('should be defined', () => {
        expect(converter).toBeDefined();
    });

    it('should not call the API if no conversion is needed', () => {
        // ACT
        const result = converter.sum(Currency.Euro);

        // ASSERT
        expect(result).toEqual(new Money(0, Currency.Euro));
    });


    describe('when using mocks', () => {
        it('should perform the conversion on one single money', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            jest.spyOn(conversionRateApi, "getRate").mockReturnValue(dollarToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate, Currency.Euro));
        });

        it('should not perform twice the same call', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            const mock = jest.spyOn(conversionRateApi, "getRate").mockReturnValue(dollarToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(1, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(3 * dollarToEuroConversionRate, Currency.Euro));
            expect(mock).toHaveBeenCalledTimes(1);                                  // <-- Boite blanche <== LE PLUS IMPORTANT
            expect(mock).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);    // <-- Boite noire
        });

        it('should take into account the different rates', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            const poundToEuroConversionRate = 1.2;
            jest.spyOn(conversionRateApi, "getRate").mockImplementation((source) => {
                if (source === CurrencyIsoCode.GBP) {
                    return poundToEuroConversionRate;
                }
                return dollarToEuroConversionRate;
            });

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Pound));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate + 2 * poundToEuroConversionRate, Currency.Euro));
        });
    });

    describe('when using fakes', () => {
        let conversionRateFake: FakeConversionRateApi;
        beforeEach(() => {
            conversionRateFake = new FakeConversionRateApi();
            converter = new CurrencyConverter(conversionRateFake);
        });

        it('should perform the conversion on one single money', () => {
            // ARRANGE
            conversionRateFake.withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, dollarToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate, Currency.Euro));
        });

        it('should not perform twice the same call', () => {
            // ARRANGE
            conversionRateFake.withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, dollarToEuroConversionRate);
            const spy = jest.spyOn(conversionRateFake, "getRate");

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(1, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(3 * dollarToEuroConversionRate, Currency.Euro));

            // Vérif avec spy
            expect(spy).toHaveBeenCalledTimes(1);                                  // <-- Boite blanche <== LE PLUS IMPORTANT
            expect(spy).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);    // <-- Boite noire

            // Verif avec implémentation interne
            expect(conversionRateFake.callsToGet).toHaveLength(1);                                                                  // <-- Boite blanche <== LE PLUS IMPORTANT
            expect(conversionRateFake.callsToGet[0]).toMatchObject({source: CurrencyIsoCode.USD, target: CurrencyIsoCode.EUR});    // <-- Boite noire
        });

        it('should take into account the different rates', () => {
            // ARRANGE
            conversionRateFake
                .withRate(CurrencyIsoCode.USD, CurrencyIsoCode.EUR, dollarToEuroConversionRate)
                .withRate(CurrencyIsoCode.GBP, CurrencyIsoCode.EUR, poundToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Pound));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate + 2 * poundToEuroConversionRate, Currency.Euro));
        });
    });
});
