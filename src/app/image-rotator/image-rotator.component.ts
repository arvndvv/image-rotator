import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'image-rotator',
  templateUrl: './image-rotator.component.html',
  styleUrls: ['./image-rotator.component.scss']
})
export class ImageRotatorComponent implements OnInit {
  @Input() hideDefaultInput = false;
  angle = 0;
  imageFitCover = true;
  isEditing = false;
  constructor(){
  }
  ngOnInit(): void {
    if(!window.FileReader){
      console.error('This browser does not support FileReader.')
      alert('This browser does not support FileReader.')
    }
  }
  f:File | undefined;
  imgSrc:string | null = null;

  handleFileSelect(event:Event){
    this.f = ((event.target as HTMLInputElement).files as FileList)[0] as File;
    const reader = new FileReader();
    if(this.f){
      reader.readAsDataURL(this.f)
    }
    reader.addEventListener("load",()=>{
      this.imgSrc = reader.result as string;
    })
  }
  drawCanvas(base64data:string){
    const canvas:any = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = base64data;
    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.translate(0, 0);
        ctx.drawImage(image, 0, 0);
    };
  }

 rotateBase64Image(base64data:any, degrees=90, callback:any) {
  if(!degrees) return;
  const canvas:any = document.createElement('canvas');
  const ctx:any = canvas.getContext("2d");
  const image = new Image();
  image.src = base64data;
  image.onload = function() {
      if (degrees === 180 || degrees === 0) {
          canvas.width = image.width;
          canvas.height = image.height;
      } else {
          canvas.width = image.height;
          canvas.height = image.width;
      }
      ctx.rotate(degrees * Math.PI / 180);
      if (degrees === 90) {
          ctx.translate(0, -canvas.width);
      } else if (degrees === 180) {
          ctx.translate(-canvas.width, -canvas.height);
      } else if (degrees === 270) {
          ctx.translate(-canvas.height, 0);
      }
      ctx.drawImage(image, 0, 0);
      callback(canvas.toDataURL('image/jpeg'));
  };
}
  rotate(degree = 90){
    this.angle = (this.angle + degree)%360;
    console.log(this.angle,'ang');
}
confirmRotate(){
    this.isEditing = false;
    this.rotateBase64Image(this.imgSrc,this.angle,this.callback)
}
 callback=(base64data:any)=> {
  const download:any = document.getElementById('download');
  const time = (new Date()).toISOString();
  download.download = ((this.f?.name.split('-')[0])?.split('_')[0])?.split('.')+ '-' + time + '.' +this.f?.name.split('.')[1];
  download.href = base64data;
  this.angle = 0;
  this.imgSrc = base64data;
}

}
