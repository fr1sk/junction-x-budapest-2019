import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    balance: string;

    constructor() {}

    ngOnInit() {
        this.balance = parseFloat(this.getRandomFloat(15000, 45000)).toFixed(2);
    }

    private getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
}
