import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { IconsModule } from '../icons/icons.module';
import {QrCodePreviewRoutingModule} from "./qr-code-preview.routing.module";
import {QrCodeComponent} from "./qr-code/qr-code.component";
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
    declarations: [QrCodeComponent, LoaderComponent],
    imports: [CommonModule, QrCodePreviewRoutingModule,  QRCodeModule, IconsModule]
})
export class QrCodePreviewModule {}
