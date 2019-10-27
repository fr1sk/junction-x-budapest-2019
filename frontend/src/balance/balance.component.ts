import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    balance: string;
    balance$: Observable<any>;

    private fetchSubscription: Subscription;

    constructor(
        private fetchService: FetchService,
        private cookieService: CookieService
    ) {}

    ngOnInit() {
        if (this.cookieService.get('user')) {
            const userId = this.cookieService.get('user').match(/\".*\"/)[0];
            this.balance$ = this.fetchService
                .getUserBudget(userId.replace(/^"(.*)"$/, '$1'))
                .pipe(map((data: any) => data.balance));
        } else {
            this.balance$ = this.fetchService
                .getUserBudget('')
                .pipe(map((data: any) => data.balance));
        }
    }

    private getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    ngOnDestroy() {
        if (this.fetchSubscription) {
            this.fetchSubscription.unsubscribe();
        }
    }
}
