import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmFinderRoutingModule } from './atm-finder.routing.module';
import { AtmMapComponent } from './atm-map/atm-map.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@NgModule({
    declarations: [AtmMapComponent, LoaderComponent],
    imports: [CommonModule, AtmFinderRoutingModule]
})
export class AtmFinderModule {}
