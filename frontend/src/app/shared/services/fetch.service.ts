import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    GetAllRecommendedAtms,
    RecommendedAtm,
    TransactionRequest,
    TransactionResponse
} from "../../modules/atm-finder/atm-map/map.constant";

@Injectable({
    providedIn: 'root'
})
export class FetchService {
    constructor(private http: HttpClient) {}

    getAllAtms(lat: number, lng: number) {
        return this.http.get(`/api/atms?longitude=${lat}&latitude=${lng}`);
    }

    getAllRecommendedAtms(request: GetAllRecommendedAtms) {
        return this.http.post<RecommendedAtm[]>(`/api/atms/recommend`, request);
    }

    createTransaction(request: TransactionRequest) {
        return this.http.post<TransactionResponse>(`/api/atms`, request);
    }
}
