import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtmMapComponent } from './atm-map/atm-map.component';
import { SuggestedAtmComponent } from './suggested-atm/suggested-atm.component';

const routes: Routes = [
    {
        path: '',
        component: AtmMapComponent
    },
    {
        path: 'suggested-atm',
        component: SuggestedAtmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtmFinderRoutingModule {}
