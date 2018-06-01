import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeFormatorPipe } from './pipes/time-formator.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ TimeFormatorPipe ],
  exports: [ CommonModule, FormsModule, TimeFormatorPipe ]
})
export class SharedModule { }
