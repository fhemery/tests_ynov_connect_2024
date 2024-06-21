<?php

namespace tests\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\Trip\ITripDAO;
use kata\TripServiceKata\Trip\Trip;
use kata\TripServiceKata\Trip\TripInterface;
use kata\TripServiceKata\Trip\TripService;
use kata\TripServiceKata\User\User;
use PHPUnit\Framework\TestCase;

class FakeTripService implements TripInterface
{
    public function getTripsByUser(User $user): array
    {
        return [new Trip()];
    }
}

class TripServiceOverload extends TripService
{
    private ?User $user = null;

    public function __construct(?TripInterface $tripService = null)
    {
        parent::__construct($tripService);
    }
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

    /** @test */
    public function should_returnEmptyArray_whenUserIsLoggedAndTargetUserIsNotFriendWithCurrent() {
        $tripService = new TripServiceOverload();
        $tripService->setLoggedUser(new User('Bob'));
        $alice = new User('Alice');
        $alice->addFriend(new User('Charlie'));

        $result = $tripService->getTripsByUser($alice);

        $this->assertEmpty($result);
    }

    /** @test */
    public function should_returnTripList_whenUserIsLoggedAndTargetUserHasUserAsFriend () {
        $tripService = new TripServiceOverload(new FakeTripService());
        $tripService->setLoggedUser(new User('Bob'));
        $alice = new User('Alice');
        $alice->addFriend(new User('Charlie'));
        $alice->addFriend(new User('Bob'));

        $result = $tripService->getTripsByUser($alice);

        $this->assertNotEmpty($result);
    }
}
