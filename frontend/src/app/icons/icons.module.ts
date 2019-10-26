import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
    Activity,
    Percent,
    DollarSign,
    Search,
    MapPin,
    Menu
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
    Activity,
    Percent,
    DollarSign,
    Search,
    MapPin,
    Menu
};

@NgModule({
    imports: [FeatherModule.pick(icons)],
    exports: [FeatherModule]
})
export class IconsModule {}

// NOTES:
// 1. We add FeatherModule to the 'exports', since the <i-feather> component will be used in templates of parent module
// 2. Don't forget to pick some icons using FeatherModule.pick({ ... })
