import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { DataServiceOptions } from '../model/data-service-options';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private baseUrl: string;

    constructor(private _httpClient: HttpClient) {
        this.baseUrl = environment.apiURL + '/';
    }

    sendPostRequest(url: string, params: any, reqOptions: DataServiceOptions = null): Promise<any> {
        let headers = new HttpHeaders();
        const requestUrl = (reqOptions && reqOptions.requestURL) ? reqOptions.requestURL : this.baseUrl;
        const options = { headers: reqOptions.headers };
        return this._httpClient
            .post(requestUrl + url, params, options)
            .toPromise()
            .then(res => res as any, err => this.handleError(err));
    }
    
    private handleError (error: HttpErrorResponse) {
        return Promise.reject(error.message || error);
    } 
}