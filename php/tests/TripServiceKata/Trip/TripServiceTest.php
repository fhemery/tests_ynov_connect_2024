<?php

namespace tests\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\Trip\ITripDAO;
use kata\TripServiceKata\Trip\Trip;
use kata\TripServiceKata\Trip\TripService;
use kata\TripServiceKata\User\User;
use PHPUnit\Framework\TestCase;

class TripServiceOverload extends TripService
{
    private ?User $user = null;
    public function setLoggedUser(User $user)
    {
        $this->user = $user;
    }

    protected function getLoggedUser()
    {
        return $this->user;
    }
}

class TripServiceTest extends TestCase
{
    /** @test */
    public function should_throwException_whenUserIsNotLogged() {
        $this->expectException(UserNotLoggedInException::class);
        $tripService = new TripServiceOverload();
        $tripService->getTripsByUser(new User('Alice'));
    }

    /** @test */
    public function should_returnEmptyArray_whenUserIsLoggedAndTargetUserHasNoFriend() {
        $tripService = new TripServiceOverload();
        $tripService->setLoggedUser(new User('Bob'));

        $result = $tripService->getTripsByUser(new User('Alice'));

        $this->assertEmpty($result);
    }
}
