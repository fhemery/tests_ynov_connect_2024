<?php

namespace kata\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\User\User;
use kata\TripServiceKata\User\UserSession;
use kata\TripServiceKata\Trip\TripDAO;

class TripService
{
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
                $tripList = TripDAO::findTripsByUser($user);
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