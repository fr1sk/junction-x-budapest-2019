import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FetchService} from 'src/app/shared/services/fetch.service';
import * as moment from 'moment';

interface StopwatchProps {
    hours: string;
    minutes: string;
    seconds: string;
}

@Component({
    selector: 'qr-code-preview',
    templateUrl: './qr-code.component.html',
    styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit, AfterViewInit {

    qrCode: string;
    stopwatch: StopwatchProps;
    cancelTimer: any;
    validUntil: any;

    constructor(private fetchService: FetchService) {
        this.qrCode = '5db4f4c13f1993025b1014ef:26413c4f958dbfa8bb943b4a1a7c7a34:35ce7bf4bb68ea4fed13e9ee0943e5c2566c72a345f30bba020648b39a35190da0fea405d6c3a7a57540cbfc4429d962';
        this.stopwatch = {
            hours: "-", minutes: "-", seconds: "-"
        };
        this.validUntil = moment().add(15, 'minutes');
    }

    ngOnInit() {
        this.updateTimer();
        this.cancelTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const now = moment();
        const validUntil = this.validUntil;

        var duration = moment.duration(validUntil.diff(now));
        var total = duration.asSeconds();
        this.stopwatch = this.secondsToStopwatchTime(total);
    }

    secondsToStopwatchTime(timeInSeconds: number): StopwatchProps {
        const hours = Math.floor(timeInSeconds / 3600).toString();
        const [minutes, seconds] = moment()
        // @ts-ignore
            .startOf('day')
            .seconds(timeInSeconds)
            .format('mm:ss')
            .split(':');
        return {hours, minutes, seconds};
    };


    // todo on destroy clear interval

    ngAfterViewInit() {
    }
}
