import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-suggested-atm',
    templateUrl: './suggested-atm.component.html',
    styleUrls: ['./suggested-atm.component.scss']
})
export class SuggestedAtmComponent implements OnInit {
    getAllRecommendedAtms$: Observable<any>;

    constructor(
        private route: ActivatedRoute,
        private fetchService: FetchService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const request = {
                x: params.lat,
                y: params.lng,
                DEPOSIT: params.deposit,
                AMOUNT: params.deposit === true ? null : params.amount,
                CURRENCY: params.deposit === true ? null : params.currency
            };

            console.log(params);
            this.getAllRecommendedAtms$ = this.fetchService.getAllRecommendedAtms(
                request
            );
            // .subscribe(data => console.log(data));
        });
    }
}
