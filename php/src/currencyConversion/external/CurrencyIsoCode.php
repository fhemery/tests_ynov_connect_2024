<?php

namespace kata\external;

enum CurrencyIsoCode
{
    case USD;
    case EUR;
    case GBP;
    case JPY;

    public function toString() {
        return match($this) {
            self::USD => "USD",
            self::EUR => "EUR",
            self::GBP => "GBP",
            self::JPY => "JPY"
        };
    }
}