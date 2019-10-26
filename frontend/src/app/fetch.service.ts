import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FetchService {
    constructor(private http: HttpClient) {}

    testirajJebeniBe() {
        this.http
            .get('/api/atms?longitude=23&latitude=23')
            .subscribe(data => console.log(data));
    }
}
