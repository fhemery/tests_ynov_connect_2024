<?php

namespace CodeKatas;

class EvenChecker
{
    private $count = 0;

    public function add($howMany)
    {
        $this->count += $howMany;
    }

    public function isEven()
    {
        /* I am pretty sure there is a better way... */
        $tmp = $this->count;
        $result = Parity::Even;
        while ($tmp > 0) {
            --$tmp;
            if ($result == Parity::Even) {
                $result = Parity::Odd;
            } else {
                $result = Parity::Even;
            }
        }

        return $result == Parity::Even;
    }
}

abstract class Parity
{
    const Even = 0;
    const Odd = 1;
}