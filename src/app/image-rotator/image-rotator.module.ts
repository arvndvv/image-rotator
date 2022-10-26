import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ImageRotatorComponent } from './image-rotator.component';



@NgModule({
  declarations: [
    ImageRotatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ImageRotatorComponent]
})
export class ImageRotatorModule { }
