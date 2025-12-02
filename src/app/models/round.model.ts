export interface Move {
    move: string;
    timing: number;
}

export interface Round {
    number: number;
    title: string;
    sequence: Move[];
}

export interface RoundsData {
    title: string;
    rounds: Round[];
}

