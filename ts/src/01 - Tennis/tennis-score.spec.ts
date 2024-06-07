import {Score, TennisScore} from "./tennis-score";

describe('Tennis Score', () => {
    it('should work', () => {
        expect(1+2).toBe(3);
    });

    beforeAll(() => {
        console.log('Starting tests');
    })

    let score: TennisScore;
    beforeEach(() => {
        console.log('Creating new tennis score');
        score = new TennisScore();
    })

    afterEach(() => {
        console.log('Done with one test');
    })

    afterAll(() => {
        console.log('Done with all tests');
    })

    it('should display 0 - 0 by default', () => {
        expect(score.getScore()).toBe('0 - 0');
    });

    it('should be 0 - 15 when receiver wins the point', () => {
        score.player2Scores();

        expect(score.getScore()).toBe('0 - 15');
    });

    it('should be 40 - 40 when game is tense', () => {
        score.player1Scores().player2Scores().player2Scores().player1Scores().player2Scores().player1Scores();

        expect(score.getScore()).toBe(`${Score.Forty} - ${Score.Forty}`);
    });
});
