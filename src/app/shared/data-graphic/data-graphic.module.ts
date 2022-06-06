import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGraphicComponent } from './data-graphic.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataGraphicComponent],
  imports: [CommonModule,  ReactiveFormsModule],
  exports: [DataGraphicComponent],
})
export class DataGraphicModule {}
