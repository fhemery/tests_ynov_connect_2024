<?php

namespace currencyConversion;

use kata\CurrencyConverter;
use kata\external\ConversionRateApi;
use kata\external\CurrencyIsoCode;
use kata\external\IConversionRateApi;
use kata\model\Currency;
use kata\model\Money;
use PHPUnit\Framework\TestCase;

class FakeConversionRateApi implements IConversionRateApi
{
    private float $rate = 1;

    public function getRate(CurrencyIsoCode $source, CurrencyIsoCode $target): float
    {
        return $this->rate;
    }

    public function setRate(float $param)
    {
        $this->rate = $param;
    }
}

class CurrencyConverterTest extends TestCase
{

    public function testShouldWork(): void
    {
        $this->assertEquals(3, 1 + 2);
    }

    /**
     * @throws Exception
     */
    public function testShouldConvertOneCurrency(): void
    {
        // ARRANGE
        $apiMock = $this->createMock(ConversionRateApi::class);
        $apiMock->method('getRate')
            ->willReturn(1.5);

        $converter = new CurrencyConverter($apiMock);

        //  This call does not work. A test double is probably necessary
        $result = $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar)]);

        $this->assertEquals(1.5, $result->amount);
        $this->assertEquals(Currency::Euro, $result->currency);
    }

    public function testShouldConvertMultipleCurrencies(): void
    {
        // ARRANGE
        $apiMock = $this->createMock(ConversionRateApi::class);
        $apiMock->method('getRate')
            ->willReturnCallback(
                function ($from, $to) {
                    if ($from == Currency::Dollar->toIsoCurrency() && $to == Currency::Euro->toIsoCurrency()) {
                        return 1.5;
                    }
                    if ($from == Currency::Pound->toIsoCurrency() && $to == Currency::Euro->toIsoCurrency()) {
                        return 0.8;
                    }
                    return 0;
                }
            );


        $converter = new CurrencyConverter($apiMock);

        //  This call does not work. A test double is probably necessary
        $result = $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar), new Money(1, Currency::Pound)]);

        $this->assertEquals(1.5 + 0.8, $result->amount);
        $this->assertEquals(Currency::Euro, $result->currency);
    }

    // Test en BOÎTE BLANCHE
    public function testShouldOnlyCallConverterOnce_whenUsedTwiceWithSameCurrency(): void
    {
        // ARRANGE
        $apiMock = $this->createMock(ConversionRateApi::class);
        $apiMock->expects($this->once())->method('getRate')
            ->with(Currency::Dollar->toIsoCurrency(), Currency::Euro->toIsoCurrency())
            ->willReturn(1.5);

        $converter = new CurrencyConverter($apiMock);

        //  This call does not work. A test double is probably necessary
        $result = $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar), new Money(2, Currency::Dollar)]);

        $this->assertEquals(3 * 1.5, $result->amount);
        $this->assertEquals(Currency::Euro, $result->currency);
    }

    public function testShouldConvertOneCurrency_withFake(): void
    {
        $fakeApi = new FakeConversionRateApi();
        //$fakeApi->withRate(CurrencyIsoCode::USD, CurrencyIsoCode::EUR, 1.5);
        $fakeApi->setRate(1.5);
        $converter = new CurrencyConverter($fakeApi);

        $result = $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar)]);

        $this->assertEquals(1.5, $result->amount);
        $this->assertEquals(Currency::Euro, $result->currency);
    }

}
