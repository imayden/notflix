import { Component } from '@angular/core';
import { FAQ } from '../../interfaces/faq';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  faqs: FAQ[] = [
    {
      question: 'What is Netflix?',
      answers: [
        'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        'You can watch as much as you want, whenever you want – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!'
      ],
      open: false
    },
    {
      question: 'How much does Netflix cost?',
      answers: [
        'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from USD8.99 to USD15.99 a month. No extra costs, no contracts.'
      ],
      open: false
    },

  ];

  toggleAnswer(faq: FAQ) {
    faq.open = !faq.open;
  }
}
