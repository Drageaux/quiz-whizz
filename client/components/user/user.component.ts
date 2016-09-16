import { Component, Input } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    //selector: "user",
    //templateUrl: `client/modules/home/home.component.html`
})
export class UserComponent {
    @Input() username:string;

    constructor(private apiService: ApiService) {}

}
