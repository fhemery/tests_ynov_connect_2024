<?php

namespace kata\external;

interface IConversionRateApi
{
    /**
     * @throws \Exception
     */
    public function getRate(CurrencyIsoCode $source, CurrencyIsoCode $target): float;
}