<?php

namespace EvenChecker;

use CodeKatas\EvenChecker;
use PHPUnit\Framework\TestCase;

class EvenCheckerTest extends TestCase
{
    public $evenChecker;

    public function setUp(): void
    {
        $this->evenChecker = new EvenChecker();
    }

    // Write tests here
    public function testShouldWork(): void
    {
        $this->assertEquals(3, 1 + 2);
    }

    public function test_shouldBeEven_whenZero(): void {
        $this->assertTrue($this->evenChecker->isEven());
    }

    public function test_shouldBeOdd_whenOne(): void {
        $this->evenChecker->add(1);

        $this->assertFalse($this->evenChecker->isEven());
    }

    public function test_shouldBeEven_whenAddingEven(): void {
        $this->evenChecker->add(4);

        $this->assertTrue($this->evenChecker->isEven());
    }

}
