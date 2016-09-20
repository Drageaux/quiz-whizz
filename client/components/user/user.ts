export class User {
    constructor(public _id:string,
                public userId:string,
                public userUrl:string,
                public email:string,
                public name:string,
                public profileImage:string,
                public highScore:number,
                public highLevel:number) {
    }
}