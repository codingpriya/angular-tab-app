import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()

export class UserService {

    constructor(
        private _dataService: DataService
    ) { }

    submitForm(data){
        return this._dataService.sendPostRequest('api/example-url/form-submission/', data).then((res: any) => res);
    }
}