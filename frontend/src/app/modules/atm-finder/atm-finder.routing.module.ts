import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtmMapComponent } from './atm-map/atm-map.component';

const routes: Routes = [
    {
        path: '',
        component: AtmMapComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtmFinderRoutingModule {}
