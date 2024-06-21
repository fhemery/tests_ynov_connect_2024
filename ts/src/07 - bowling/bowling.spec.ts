import {BowlingGame} from "./bowling-game";

describe('Bowling kata', () => {

    it('should return 0 when all frames are misses', () => {
        const game = "-- -- -- -- -- -- -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(0);
    });

    it('should return number of pins down when one ball hits', () => {
        const game = "-2 -- -- -- -- -- -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(2);
    });

    it('should sum the throws for each frame', () => {
        const game = "32 -- 6- -- -- -- -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(11);
    });

    it('should count 10 as a base for a strike', () => {
        const game = "-- -- -- X -- -- -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(10);
    })

    it('should add the next two throws to frame score when current frame is a strike', () => {
        const game = "-- -- -- X 11 -- -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(12 + 2);
    })

    it('should add the next two throws to frame score when current frame is a strike, case of a strike next', () => {
        const game = "-- -- -- X X 12 -- -- -- --";
        const bowling = new BowlingGame(game);

        expect(bowling.getScore()).toBe(21 + 13 + 3);
    });

    // Manque :
    // - Spares
    // - Strike -> Spare
    // - End game

});
