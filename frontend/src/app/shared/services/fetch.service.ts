import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FetchService {
    constructor(private http: HttpClient) {}

    getAllAtms(lat: number, lng: number) {
        return this.http.get(`/api/atms?longitude=${lat}&latitude=${lng}`);
    }
}
