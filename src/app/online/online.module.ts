import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { OnlineRoutingModule } from './online-routing.module';
import { OnlineComponent } from './online.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OnlineRoutingModule
  ],
  declarations: [ OnlineComponent ]
})
export class OnlineModule { }
