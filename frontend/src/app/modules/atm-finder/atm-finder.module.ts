import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmFinderRoutingModule } from './atm-finder.routing.module';
import { AtmMapComponent } from './atm-map/atm-map.component';
import { IconsModule } from '../icons/icons.module';
import { SuggestedAtmComponent } from './suggested-atm/suggested-atm.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [AtmMapComponent, SuggestedAtmComponent],
    imports: [
        CommonModule,
        AtmFinderRoutingModule,
        IconsModule,
        FormsModule,
        SharedModule
    ]
})
export class AtmFinderModule {}
