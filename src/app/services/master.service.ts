import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { User } from "../interface/user.interface";
import { AuthService } from "./auth.service";
import { RestapiService } from "./restapi.service";


@Injectable({
    providedIn: 'root'
})

export class MasterService {
    masterData: any = [];
    masterDataAll: any = [];
    data: any = [];


    constructor(private _restApiService: RestapiService, private _authService: AuthService) { }


    invokeMasterData() {
        this._restApiService.get('Master/GetMasters').subscribe(response => {
            if (response) {
                this.data = response;
                this.masterDataAll = response;
            }
        })
    }

    getMaster(value: any) {
        this.masterData = [];
        //country-master
        switch (value) {
            case 'CM':
                if (this.data.country_Masters !== undefined && this.data.country_Masters !== null) {
                    this.data.country_Masters.forEach((c: any) => {
                        this.masterData.push({ name: c.countryname, code: c.countrycode });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //state-master
            case 'SM':
                if (this.data.statemasters !== undefined && this.data.statemasters !== null) {
                    this.data.statemasters.forEach((c: any) => {
                        this.masterData.push({ name: c.statename, code: c.statecode, countrycode: c.countrycode });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //city-master
            case 'CIM':
                if (this.data.city_Masters !== undefined && this.data.city_Masters !== null) {
                    this.data.city_Masters.forEach((c: any) => {
                        this.masterData.push({ name: c.cityname, code: c.citycode, statecode: c.statecode });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            // Main-Category
            case 'MC':
                if (this.data.main_Categorymasters !== undefined && this.data.main_Categorymasters !== null) {
                    this.data.main_Categorymasters.forEach((c: any) => {
                        this.masterData.push({ name: c.categoryname, code: c.sino });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //Sub-Category
            case 'SC':
                if (this.data.sub_Categorymasters !== undefined && this.data.sub_Categorymasters !== null) {
                    this.data.sub_Categorymasters.forEach((c: any) => {
                        this.masterData.push({ name: c.categoryname, code: c.sino, maincategorycode: c.maincategorycode });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //Role-Master
            case 'RM':
                if (this.data.role_Masters !== undefined && this.data.role_Masters !== null) {
                    this.data.role_Masters.forEach((c: any) => {
                        this.masterData.push({ name: c.rolename, code: c.roleid });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //Union-Master
            case 'UM':
                if (this.data.union_Masters !== undefined && this.data.union_Masters !== null) {
                    this.data.union_Masters.forEach((c: any) => {
                        this.masterData.push({ name: c.unionname, code: c.sino });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //Expenese-Category
            case 'EC':
                if (this.data.expensescategory_Masters !== undefined && this.data.expensescategory_Masters !== null) {
                    this.data.expensescategory_Masters.forEach((c: any) => {
                        this.masterData.push({ name: c.name, code: c.sino });
                    })
                } else {
                    this.masterData = [];
                }
                break;

            //Shooting-Status
            case 'SS':
                if (this.data.shooting_Statuses !== undefined && this.data.shooting_Statuses !== null) {
                    this.data.shooting_Statuses.forEach((c: any) => {
                        this.masterData.push({ name: c.status, code: c.slno });
                    })
                } else {
                    this.masterData = [];
                }
                break;
        }
        return this.masterData;

    }
}




