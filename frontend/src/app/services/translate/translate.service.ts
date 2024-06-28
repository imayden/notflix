import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private apiUrl = 'https://libretranslate.de/translate';

  constructor(private http: HttpClient) { }

  translate(text: string, targetLang: string): Observable<any> {
    const body = {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text'
    };

    return this.http.post(this.apiUrl, body);
  }
}
