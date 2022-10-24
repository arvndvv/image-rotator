import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'custom-uploader',
  templateUrl: './custom-uploader.component.html',
  styleUrls: ['./custom-uploader.component.scss']
})
export class CustomUploaderComponent implements OnInit, AfterViewInit {
  @Output() fileChange = new EventEmitter<File>();
  @Output() thumbnailChange = new EventEmitter<any>();
  @Input() hideDefaultInput = false;
  @Input() hideDefaultThumbnail = false;
  @ViewChild('thumbnail') thumbnail!:ElementRef;
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
    this.fileChange.emit(this.f)
    const reader = new FileReader();
    console.log(this.fileChange);

    if(this.f){
      reader.readAsDataURL(this.f)
    }
    reader.addEventListener("load",()=>{
      // console.log(reader.result);
      this.imgSrc = reader.result as string;
      // this.drawCanvas(this.imgSrc)
      // this.thumbnailChange.emit(this.thumbnail.nativeElement)
      // navigator.clipboard.writeText(this.imgSrc)
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
      console.log('cow',degrees);

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
  // console.log(base64data);
  const download:any = document.getElementById('download');
  const time = (new Date()).toISOString();
  download.download = this.f?.name.split('.')[0]+ '-' + time + '.' +this.f?.name.split('.')[1];
  download.href = base64data;
  this.angle = 0;
  this.imgSrc = base64data;
}
download(){
  const canvas:any = document.getElementById('c');
  const img = canvas.toDataURL('image/jpeg');
  console.log(img);

}
  ngAfterViewInit(): void {
    if(this.thumbnail){
      // consol/e.log('test',this.thumbnail)
    }
  }
}
