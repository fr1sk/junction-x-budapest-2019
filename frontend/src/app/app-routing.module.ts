import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BalanceComponent } from 'src/balance/balance.component';

const routes: Routes = [
    {
        path: '',
        component: BalanceComponent
    },
    {
        path: 'atm-finder',
        loadChildren: () =>
            import('./modules/atm-finder/atm-finder.module').then(
                m => m.AtmFinderModule
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
