import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  title = 'ngx-cropper';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};
  footerCroppedImage: string | null | undefined;
  profileCroppedImage: string | null | undefined;
  rightCroppedImage: string | null | undefined;
  modalRef!: BsModalRef;
  constructor(private utils: UtilsService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  fileChangeEvent(template: TemplateRef<any>, event: any): void {
    console.log(event.target.files[0])
    this.imageChangedEvent = event;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal_custom_lg' }));
  }

  imageCropped(event: ImageCroppedEvent, position: string) {
    if (position == 'header') {
      this.croppedImage = event.base64;
    }
    if (position == 'footer') {
      this.footerCroppedImage = event.base64;
    }
    if (position == 'profile') {
      this.profileCroppedImage = event.base64;
    }
    if (position == 'right') {
      this.rightCroppedImage = event.base64;
    }
    console.log(event);
    this.utils.urltoFile(event.base64).then(res => {
      console.log(res)
    })
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  closeModal() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }
    this.croppedImage = '';
    this.footerCroppedImage = '';
    this.profileCroppedImage = '';
    this.rightCroppedImage = '';
    this.modalRef?.hide();
  }
}
