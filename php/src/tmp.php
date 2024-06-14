$apiMock = $this->createMock(ConversionRateApi::class);
$apiMock->expects($this->once())
->method('getRate')
->with(Currency::Dollar->toIsoCurrency(), Currency::Euro->toIsoCurrency())
->willReturn(1.5);

$converter = new CurrencyConverter($apiMock);

//  This call does not work. A test double is probably necessary
$result = $converter->sum(Currency::Euro, [new Money(1, Currency::Dollar)]);

$this->assertEquals(1.5, $result->amount);
$this->assertEquals(Currency::Euro, $result->currency);