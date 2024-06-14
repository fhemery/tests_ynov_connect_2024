import {CurrencyIsoCode} from "./external/currency-iso-code";

export interface IConversionRateApi {
    getRate(source: CurrencyIsoCode, target: CurrencyIsoCode): number;
}
