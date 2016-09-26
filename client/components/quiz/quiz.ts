export class Quiz {
    constructor(public expr: string[],
                public givenValue: string,
                public targetValue: string,
                public score: number) {
    }
}