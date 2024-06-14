<?php

namespace kata\external;


class ConversionRateApi
{

    /**
     * @throws \Exception
     */
    public function getRate(CurrencyIsoCode $source, CurrencyIsoCode $target): float {
        echo 'Getting rate from '.$source->toString().' to '.$target->toString();
        throw new \Exception("401 - Unauthorized, IP not recognized. Are you trying to call us via a unit test?");
    }
}