const STRIKE_BASE_SCORE = 10;

const STRIKE_CHARACTER = 'X';

class BallThrow {
    constructor(private aThrow: string) {
    }

    getScore(): number {
        if (this.isStrike()) {
            return STRIKE_BASE_SCORE;
        }
        const aThrowAsInt = parseInt(this.aThrow);
        return isNaN(aThrowAsInt) ? 0 : aThrowAsInt;
    }

    isStrike() {
        return this.aThrow === STRIKE_CHARACTER;
    }
}

class Frame {
    private firstThrow: BallThrow = new BallThrow('');
    private secondThrow?: BallThrow;
    private nextFrame?: Frame;
    private nextNextFrame?: Frame;

    constructor(frameAsStr: string) {
        this.firstThrow = new BallThrow(frameAsStr[0]);
        if (frameAsStr.length > 1) {
            this.secondThrow = new BallThrow(frameAsStr[1]);
        }
    }

    setNextFrames(frame1: Frame, frame2: Frame) {
        this.nextFrame = frame1;
        this.nextNextFrame = frame2;
    }

    getScore(): number {
        if (this.isStrike()) {
            if (this.nextFrame?.isStrike()) {
                return STRIKE_BASE_SCORE + STRIKE_BASE_SCORE + (this.nextNextFrame?.getFirstThrowScore() || 0);
            }
            return STRIKE_BASE_SCORE + (this.nextFrame?.getScore() || 0);
        }
        return this.firstThrow.getScore() + (this.secondThrow?.getScore() || 0);
    }

    getFirstThrowScore() {
        return this.firstThrow.getScore();
    }

    private isStrike() {
        return this.firstThrow.isStrike();
    }
}

export class BowlingGame {
    private frames: Frame[] = [];

    constructor(private game: string) {
        this.frames = this.game.split(' ').map(frameAsStr => new Frame(frameAsStr));
        for (let i = 0; i < this.frames.length; ++i) {
            this.frames[i].setNextFrames(this.frames[i+1], this.frames[i+2]);
        }
    }

    getScore(): number {
         return this.frames.reduce((acc, curr) => acc + curr.getScore(), 0);
    }
}
