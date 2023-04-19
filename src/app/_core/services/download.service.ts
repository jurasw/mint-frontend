import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class DownloadService {
  constructor(private _http: HttpClient, private _domSanitizer: DomSanitizer) {}

  public downloadFileFromUrl(url: string): Observable<Blob> {
    const filePath = url.split('/getuploads/').pop();
    return this._http.get(`${API_URL}/getuploads/${filePath}`, {
      responseType: 'blob',
    });
  }

  public getSafeUrlFromBlob(blob: Blob, style = false): SafeStyle | SafeUrl {
    const unsafeImageUrl = URL.createObjectURL(blob);
    const imageUrl = style ? this._domSanitizer.bypassSecurityTrustStyle(
      `url(${unsafeImageUrl}`
    ) : this._domSanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    return imageUrl;
  }
}
