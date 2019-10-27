import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
    Activity,
    Percent,
    DollarSign,
    Search,
    MapPin,
    Menu,
    Check,
    X,
    Map,
    Watch
} from 'angular-feather/icons';

const icons = {
    Activity,
    Percent,
    DollarSign,
    Search,
    MapPin,
    Menu,
    Check,
    X,
    Map,
    Watch
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule]
})
export class IconsModule {}
