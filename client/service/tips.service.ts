import {Injectable} from "@angular/core";

@Injectable()
export class TipsService {
    public tips: any[] = [
        "Operators (+, -, x, /) must always be in the first answer slot",
        "You will lose 1 health if time runs out. The time will refill until health reaches 0",
        "Gain 1 health every 5 correct answers",
        "Gain X amount of time for each X-level correct answer (up to 10 seconds)",
        "Every 10 level, there will be more wrong options to select",
        "Click the Booster to activate challenge mode. You will get 2x points for each challenge question"
    ];

    constructor() {
    }

    public makeRandomTipObject() {
        let index = Math.floor((Math.random() * (this.tips.length - 1)));

        return {
            header: "Game Tip #" + (index + 1) + ":",
            message: this.tips[index] + "",
        }
    }
}