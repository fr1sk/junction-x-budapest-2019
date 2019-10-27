import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
    {
        path: '',
        component: QrCodeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QrCodePreviewRoutingModule {}
