import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileName:string = '';
  handleFileName(fileName:string){
    this.fileName = fileName;
  }

}
