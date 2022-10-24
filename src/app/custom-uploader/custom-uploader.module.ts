import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomUploaderComponent } from './custom-uploader.component';



@NgModule({
  declarations: [
    CustomUploaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[CustomUploaderComponent]
})
export class CustomUploaderModule { }
