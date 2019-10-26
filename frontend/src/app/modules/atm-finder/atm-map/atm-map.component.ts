import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {} from 'googlemaps';
import { gMapStyles } from './map.constant';
import { FetchService } from 'src/app/fetch.service';

interface LatLng {
    lat: string;
    lng: string;
}

@Component({
    selector: 'app-atm-map',
    templateUrl: './atm-map.component.html',
    styleUrls: ['./atm-map.component.scss']
})
export class AtmMapComponent implements AfterViewInit {
    @ViewChild('map') mapElement: any;
    map: google.maps.Map;
    mapLoaded: boolean;

    constructor(private fetchService: FetchService) {}

    ngOnInit() {
        this.mapLoaded = false;
        this.fetchService.testirajJebeniBe();
    }

    ngAfterViewInit() {
        this.getLocation();
    }

    private getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;

                this.initMap(longitude, latitude);
            });
        } else {
            console.log('No support for geolocation');
        }
    }

    private initMap(long: number, lat: number) {
        const mapProperties = {
            center: new google.maps.LatLng(lat, long),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: gMapStyles,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapProperties
        );

        this.mapLoaded = true;
    }
}
