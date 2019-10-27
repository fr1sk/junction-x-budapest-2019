import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodePreviewRoutingModule } from './qr-code-preview.routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    declarations: [QrCodeComponent],
    imports: [
        CommonModule,
        QrCodePreviewRoutingModule,
        QRCodeModule,
        SharedModule
    ]
})
export class QrCodePreviewModule {}
