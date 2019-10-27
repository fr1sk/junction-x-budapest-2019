import {} from 'googlemaps';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { gMapStyles, Atm, LatLng } from './map.constant';
import { FetchService } from 'src/app/shared/services/fetch.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-atm-map',
    templateUrl: './atm-map.component.html',
    styleUrls: ['./atm-map.component.scss']
})
export class AtmMapComponent implements OnInit, AfterViewInit {
    @ViewChild('map') mapElement: any;
    map: google.maps.Map;
    mapLoaded: boolean;
    isWithdrawSelected: boolean;
    isInputChanged: boolean;
    lat: number;
    lng: number;
    amountVal: number;

    private fetchSubscription: Subscription;

    constructor(private fetchService: FetchService, private router: Router) {}

    ngOnInit() {
        this.mapLoaded = false;
        this.isWithdrawSelected = false;
        this.isInputChanged = false;
        this.amountVal = null;
    }

    ngAfterViewInit() {
        this.getLocation();
    }

    withdrawClicked() {
        this.isWithdrawSelected = true;
    }

    onWithdrawConfirmClick() {
        console.log(this.amountVal);
        this.router.navigate(['/atm-finder/suggested-atm'], {
            queryParams: {
                lat: this.lat,
                lng: this.lng,
                amount: this.amountVal,
                deposit: !this.isWithdrawSelected,
                currency: 'HUF'
            }
        });
    }

    depositClicked() {
        this.router.navigate([`/atm-finder/suggested-atm`], {
            queryParams: {
                deposit: true,
                lat: this.lat,
                lng: this.lng
            }
        });
    }

    onInputChange(event) {
        this.isInputChanged = true;
    }

    private getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                this.lat = latitude;
                this.lng = longitude;

                this.initMap(latitude, longitude);
            });
        } else {
            console.log('No support for geolocation');
        }
    }

    private initMap(lat: number, lng: number) {
        const mapProperties = {
            center: new google.maps.LatLng(lat, lng),
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

        this.fetchSubscription = this.fetchService
            .getAllAtms(lat, lng)
            .subscribe((data: Atm[]) => {
                data.map(
                    el =>
                        new google.maps.Marker({
                            position: new google.maps.LatLng(
                                el.LOCATION.X,
                                el.LOCATION.Y
                            ),
                            icon:
                                'https://slicicemluade.vsimonovski.now.sh/otp_pin.png',
                            map: this.map
                        })
                );

                const userMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: this.map
                });
            });

        this.mapLoaded = true;
    }

    ngOnDestroy() {
        if (this.fetchSubscription) {
            this.fetchSubscription.unsubscribe();
        }
    }
}
