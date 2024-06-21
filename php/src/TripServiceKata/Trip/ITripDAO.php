<?php

namespace kata\TripServiceKata\Trip;

use kata\TripServiceKata\User\User;

interface ITripDAO
{
    public function findTripsByUser(User $user);
}