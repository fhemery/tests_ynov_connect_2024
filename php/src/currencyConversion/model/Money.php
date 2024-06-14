<?php

namespace kata\model;

class Money
{

    public float $amount;
    public Currency $currency;

    public function __construct(float $amount, Currency $currency)
    {
        $this->amount = $amount;
        $this->currency = $currency;
    }
}