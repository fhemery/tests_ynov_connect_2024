const FRAME_SYMBOL = '/';

const SPARE_BASE_SCORE = 10;

class Frame {
    // Frame needs next frame to compute spare
    // and potentially the one after for a strike
    constructor(private frame: string) {
    }

    getScore(): number {
        if (this.isSpare()) {
            return SPARE_BASE_SCORE;
        }
        let result = 0;
        for (let i =0; i< this.frame.length; i++) {
            const pins = parseInt(this.frame[i]);
            result += isNaN(pins) ? 0 : pins;
        }
        return result;
    }

    private isSpare() {
        return this.frame[1] === FRAME_SYMBOL;
    }
}

class BowlingGame {
    private frames: Frame[];
    constructor(private game: string) {
        this.frames = game.split(" ").map(f => new Frame(f));
    }

    getScore() : number {
        return this.frames.map(f => f.getScore()).reduce((acc, curr) => acc + curr, 0);
    }
}

describe('Bowling Game', () => {
    it('should return 0 if there are only misses', () => {
        const game = new BowlingGame('-- -- -- -- -- -- -- -- -- --');

        const result = game.getScore();

        expect(result).toBe(0);
    });

    it('should return the number of pins that are down if all are not down', () => {
        const game = new BowlingGame('-- 2- -3 -- -- -- -- -- -- --');

        const result = game.getScore();

        expect(result).toBe(5);
    });

    it('should return 10 for a spare', () => {
        const game = new BowlingGame('-- 2/ -3 -- -- -- -- -- -- --');

        const result = game.getScore();

        expect(result).toBe(10 + 3);
    })

    xit('should double the next throw for a spare', () => {
        const game = new BowlingGame('-- 2/ 3- -- -- -- -- -- -- --');

        const result = game.getScore();

        expect(result).toBe(13 + 3);
    })
});
