<?php

namespace kata\model;

use kata\external\CurrencyIsoCode;

enum Currency
{
    case Euro;
    case Dollar;
    case Pound;
    case Yen;

    public function toString() {
        return match($this) {
            self::Euro => "€",
            self::Dollar => "$",
            self::Pound => "£",
            self::Yen => "¥"
        };
    }

    public function toIsoCurrency(): CurrencyIsoCode
    {
        return match($this) {
            self::Euro => CurrencyIsoCode::EUR,
            self::Dollar => CurrencyIsoCode::USD,
            self::Pound => CurrencyIsoCode::GBP,
            self::Yen => CurrencyIsoCode::JPY,
        };
    }
}