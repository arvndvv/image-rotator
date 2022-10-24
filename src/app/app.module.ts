import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomUploaderModule } from './custom-uploader/custom-uploader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
