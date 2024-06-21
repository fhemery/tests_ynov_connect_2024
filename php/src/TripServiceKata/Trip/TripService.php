<?php

namespace kata\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\User\User;
use kata\TripServiceKata\User\UserSession;
use kata\TripServiceKata\Trip\TripDAO;

interface TripInterface {
    public function getTripsByUser(User $user): array;

}

class DefaultTripService implements TripInterface {
    public function getTripsByUser(User $user): array
    {
        return (new TripDAO)->findTripsByUser($user);
    }
}

class TripService
{
    private TripInterface $tripService;

    public function __construct(?TripInterface $tripService = null)
    {
        if ($tripService == null) {
            $this->tripService = new DefaultTripService();
        } else {
            $this->tripService = $tripService;
        }
    }
    /**
     * @return Trip[]
     * @throws UserNotLoggedInException
     */
    public function getTripsByUser(User $user): array
    {
        $tripList = array();
        $loggedUser = $this->getLoggedUser();
        $isFriend = false;
        if ($loggedUser != null) {
            foreach ($user->getFriends() as $friend) {
                if ($friend == $loggedUser) {
                    $isFriend = true;
                    break;
                }
            }
            if ($isFriend) {
                $tripList = $this->tripService->getTripsByUser($user);
            }
            return $tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    /**
     * @return mixed
     */
    protected function getLoggedUser()
    {
        return UserSession::getInstance()->getLoggedUser();
    }
}