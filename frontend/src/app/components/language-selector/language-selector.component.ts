import { Component } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  
  constructor (private translateService: TranslateService){}

  onLanguageChange(event: any) {
    const targetLang = event.target.value;
    const element = document.querySelectorAll('[translate]');

    element.forEach( element => {
      const originalText = element.getAttribute('data-original-text') ||
        element.textContent;
      

    });
  }
}
