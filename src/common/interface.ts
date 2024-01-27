export interface IUser {
    name: string;
    username: string;
    password: string;
    coin: number;
}
export interface IGameHistory {
    moneyEarned: number;
    moneyLost: number;
    status: string;
    username: string;
}
export interface IStats {
    wonCount: number;
    drawCount: number;
    lossCount: number;
    currentStreak: number;
    maxStreak: number;
    totalMoneyEarned: number;
    totalMoneyLost: number;
}
export interface IRankingDataItem {
    name: string;
    username: string;
    wonRate: string;
    wonStreak: number;
    balance: string;
}
export interface IPlayerInitialState {
    user: IUser;
}
export interface IState {
    player: IPlayerInitialState;
    game: IGameInitialState;
}
export interface IGameInitialState {
    betMoney: Array<{ name: string; coin: number }>;
    rolled: boolean;
    afterRollDices: Array<{ name: string; quantity: number }>;
    betted: boolean;
    open: boolean;
    endGame: boolean;
    diffAmount: number;
    diffAmountCalculateCompleted: boolean;
    totalAmountReceived: number;
    result: Array<{ name: string; status: string }>;
    resultMsg: string;
    totalBetMoney: number;
}
export interface IBetMoneyItem {
    name: string;
    coin: number;
    betLevel: number;
}