import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  documentSrc = '';
  pdfSrc: Uint8Array;

  constructor(private httpClient: HttpClient) {}

  fetchPDF() {
    const reqUrl =
      'https://finmark-staging.wealthfy.com/api/FileStorageContainers/finmark-staging-accountusers/download/52332081-2360-49b8-99d7-a6bff7085ca1.pdf';

    const headers = new HttpHeaders()
      .set('version', '1.0.0')
      .set('source', 'web');

    this.httpClient
      .get(reqUrl, { headers })
      .toPromise()
      .then((res: any) => {
        const binaryData = [];
        binaryData.push(res);
        this.documentSrc = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'application/pdf' })
        );
        console.log(this.documentSrc);
      })
      .catch((error) => console.error(error));
  }
}
