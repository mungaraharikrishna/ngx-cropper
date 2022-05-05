import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  async urltoFile(url: any, filename?: any, mimeType?: any): Promise<any> {
    if (url) {
      if (url.indexOf('data:image') === -1 && url.indexOf('blob.core') === -1) {
        url = 'data:image/png;base64,' + url;
      }
      if (!filename) {
        filename = 'temp.png';
      }
      if (!mimeType) {
        mimeType = 'image/png';
      }
      return (fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type: mimeType }))
      );
    }
  }
}
