import "jest";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";

class TripServiceOverload extends TripService {
    private user: User | null = null;
    private trips: Trip[] = [];
    override getLoggedUser(): User | null {
        return this.user;
    }

    setUser(user: User | null) {
        this.user = user;
    }

    addTrip(trip: Trip) {
        this.trips.push(trip);
    }

    override getTrips(): Trip[] {
        return this.trips;
    }
}

describe("TripServiceShould", () => {
    let tripService: TripServiceOverload;
    beforeEach(() => {
        tripService = new TripServiceOverload();
    });

    it('throw exception when logged user is null (overload)', () => {
        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    } )

    it('should return empty for a logged user and an input user with no friend', () => {
        tripService.setUser(new User());
        expect( tripService.getTripsByUser(new User())).toEqual([]);
    });

    it('should return empty if alice is logged and bob does not have alice as a friend', () => {
        const alice = new User();
        const bob = new User();
        const carol = new User();
        bob.addFriend(carol);
        alice.addFriend(bob);
        tripService.setUser(alice);

        const trips = tripService.getTripsByUser(bob);

        expect(trips).toEqual([]);

    });

    it('should return bob\'s trips if alice is logged and is a friend of bob', () => {
        const alice = new User();
        const bob = new User();
        const carol = new User();
        bob.addFriend(carol);
        bob.addFriend(alice);
        tripService.setUser(alice);
        const tripToSydney = new Trip();
        tripService.addTrip(tripToSydney)

        const trips = tripService.getTripsByUser(bob);

        expect(trips).toEqual([tripToSydney]);

    });
});
