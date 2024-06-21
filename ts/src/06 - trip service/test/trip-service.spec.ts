import "jest";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";

jest.mock("../src/user/UserSession");
jest.mock("../src/trip/TripDAO");

describe("TripServiceShould", () => {
    let tripService: TripService;
    beforeEach(() => {
        tripService = new TripService();
    });

    it('throw exception when logged user is null (mock)', () => {
        (UserSession.getLoggedUser as jest.Mock).mockReturnValue(null);
        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    } )

    it('throw exception when logged user is null (overload)', () => {
        expect(() => tripService.getTripsByUser(new User())).toThrow(new UserNotLoggedInException());
    } )
});
