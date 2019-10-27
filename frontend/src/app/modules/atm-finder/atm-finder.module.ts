import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmFinderRoutingModule } from './atm-finder.routing.module';
import { AtmMapComponent } from './atm-map/atm-map.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { IconsModule } from '../icons/icons.module';
import { SuggestedAtmComponent } from './suggested-atm/suggested-atm.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AtmMapComponent, LoaderComponent, SuggestedAtmComponent],
    imports: [CommonModule, AtmFinderRoutingModule, IconsModule, FormsModule]
})
export class AtmFinderModule {}
