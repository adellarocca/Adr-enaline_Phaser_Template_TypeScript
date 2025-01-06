import { GameOptions } from '../Constants/gameOptions';

interface IWorldParameters {
    width: number;
    height: number;
    readonly centerX: number;
    readonly centerY: number;
};

interface IGameParameters {
    worldParameters: IWorldParameters;
};

class WorldParameters implements IWorldParameters {
    constructor(public width: number, public height: number) {}

    get centerX(): number {
        return this.width / 2;
    }

    get centerY(): number {
        return this.height / 2;
    }
};

class GameOptionsClass implements IGameParameters {
    worldParameters: IWorldParameters;

    constructor(width: number, height: number) {
        this.worldParameters = new WorldParameters(width, height);
    };
};

let GameParameters = new GameOptionsClass(GameOptions.gameSize.width, GameOptions.gameSize.height);

export default GameParameters;
