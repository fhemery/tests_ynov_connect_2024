<?php

namespace kata\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\DependentClassCalledDuringUnitTestException;
use kata\TripServiceKata\User\User;

class TripDAO implements ITripDAO
{
    public function findTripsByUser(User $user)
    {
        throw new DependentClassCalledDuringUnitTestException('TripDAO should not be invoked on an unit test.');
    }
}
