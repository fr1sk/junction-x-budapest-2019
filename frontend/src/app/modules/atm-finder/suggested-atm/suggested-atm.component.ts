import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-suggested-atm',
    templateUrl: './suggested-atm.component.html',
    styleUrls: ['./suggested-atm.component.scss']
})
export class SuggestedAtmComponent implements OnInit, OnDestroy {
    getAllRecommendedAtms$: Observable<any>;
    userLat: number;
    userLng: number;

    private queryParamsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private fetchService: FetchService,
        private router: Router
    ) {}

    ngOnInit() {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            params => {
                this.userLat = params.lat;
                this.userLng = params.lng;
                const request = {
                    x: params.lat,
                    y: params.lng,
                    DEPOSIT: params.deposit,
                    AMOUNT: !!params.deposit ? null : params.amount,
                    CURRENCY: !!params.deposit ? null : params.currency
                };

                console.log(params);
                this.getAllRecommendedAtms$ = this.fetchService.getAllRecommendedAtms(
                    request
                );
            }
        );
    }

    selectAtm(lat: number, lng: number, id: string) {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            params => {
                this.router.navigate(['qr-code'], {
                    queryParams: {
                        deposit: params.deposit,
                        amount: params.amount,
                        atm_id: id,
                        type: !!params.deposit ? 'DEPOSIT' : 'WITHDRAW',
                        currency: !!params.deposit ? null : params.currency,
                        userLat: params.lat,
                        userLng: params.lng,
                        atmLat: lat,
                        atmLng: lng
                    }
                });
            }
        );
    }

    ngOnDestroy() {
        if (this.queryParamsSubscription) {
            this.queryParamsSubscription.unsubscribe();
        }
    }
}
