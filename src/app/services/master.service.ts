import { Injectable } from "@angular/core";
import { User } from "../interface/user.interface";
import { AuthService } from "./auth.service";
import { RestapiService } from "./restapi.service";


@Injectable({
    providedIn: 'root'
})

export class MasterService {
    masterData: any = [];
    masterDataAll: any = [];
    userInfo!: User;
    constructor(private _restApiService: RestapiService, private _authService: AuthService) { }

    invokeMasterData() {
        this._restApiService.get('Master/GetMasters').subscribe(response => {
            if (response) {
                this.masterData = response;
                this.masterDataAll = response;
            }
        }) 
    }

    getMastersAll() {
        return this.masterDataAll;
        
}
}

