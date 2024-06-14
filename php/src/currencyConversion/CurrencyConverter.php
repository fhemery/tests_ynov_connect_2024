<?php

namespace kata;

use kata\external\ConversionRateApi;
use kata\external\IConversionRateApi;
use kata\model\Currency;
use kata\model\Money;

class CurrencyConverter
{
    private IConversionRateApi $conversionRateApi;

    public function __construct(IConversionRateApi $api)
    {
        $this->conversionRateApi = $api;
    }

    /**
     * @throws \Exception
     */
    function sum(Currency $target, array $moneys) : Money
    {
        $total = 0;
        $knownRates = [$target->toString() => 1];

        /* @var $m Money */
        foreach($moneys as $m){
            if (!array_key_exists($m->currency->toString(), $knownRates)) {
                $knownRates[$m->currency->toString()] = $this->conversionRateApi->getRate($m->currency->toIsoCurrency(), $target->toIsoCurrency());
            }

            $total += $knownRates[$m->currency->toString()] * $m->amount;
        }

        return new Money($total, $target);
    }

}