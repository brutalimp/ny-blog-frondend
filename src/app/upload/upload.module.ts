import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UploadRoutingModule
  ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
