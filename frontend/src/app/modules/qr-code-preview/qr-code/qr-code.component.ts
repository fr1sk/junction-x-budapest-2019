import {
    AfterViewInit,
    ViewChild,
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { FetchService } from 'src/app/shared/services/fetch.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { gMapStyles } from '../../atm-finder/atm-map/map.constant';

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
export class QrCodeComponent implements OnInit, OnDestroy {
    @ViewChild('qrMap') mapElement: any;
    map: google.maps.Map;

    qrCode: string;
    stopwatch: StopwatchProps;
    cancelTimer: any;
    validUntil: any;

    userLat: number;
    userLng: number;
    atmLat: number;
    atmLng: number;

    private queryParamsSubscription: Subscription;

    constructor(
        private fetchService: FetchService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            params => {
                this.userLat = params.userLat;
                this.userLng = params.userLng;

                this.atmLat = params.userLat;
                this.atmLng = params.userLng;

                console.log(params);
                this.fetchService
                    .createTransaction({
                        AMOUNT: params.deposit ? null : params.amount,
                        CURRENCY: params.deposit ? null : 'HUF',
                        ATM_ID: params.atm_id,
                        TYPE: params.type,
                        USER_ID: '5db4e787082774ebc0b6ef8d'
                    })
                    .subscribe(data => {
                        this.qrCode = data.TRANSACTION_ID + '_' + data.QR_CODE;
                    });
            }
        );

        this.stopwatch = {
            hours: '-',
            minutes: '-',
            seconds: '-'
        };
        this.validUntil = moment().add(15, 'minutes');

        this.updateTimer();
        this.cancelTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    ngAfterViewInit() {
        this.initMap(1, 2);
    }

    updateTimer() {
        const now = moment();
        const validUntil = this.validUntil;

        const duration = moment.duration(validUntil.diff(now));
        const total = duration.asSeconds();
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
        return { hours, minutes, seconds };
    }

    private initMap(lat: number, lng: number) {
        const mapProperties = {
            center: new google.maps.LatLng(this.atmLat, this.atmLng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: gMapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        };
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapProperties
        );

        const atmMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.atmLat, this.atmLng),
            icon: 'https://slicicemluade.vsimonovski.now.sh/otp_pin.png',
            map: this.map
        });

        const userMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.userLat, this.userLng),
            map: this.map
        });
    }

    ngOnDestroy() {
        if (this.queryParamsSubscription) {
            this.queryParamsSubscription.unsubscribe();
        }
    }
}
