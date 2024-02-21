import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Word} from "../word";
import {WordService} from "../_services/word-service.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.css']
})
export class WordFormComponent {
  translationValue: String;
  word: Word;

  constructor(private router: Router, private wordService: WordService) {
    this.word = new Word();
    this.word.lang = "EN";
    this.translationValue = "";
  }

  onSubmit() {
    this.wordService.save(this.word).subscribe(
      response => {
        console.log('Сохранено успешно', response);
        this.gotoUserList();
      },
      error => {
        console.error('Ошибка при сохранении', error);
      }
    );
  }

  gotoUserList() {
    this.router.navigate(['/words']);
  }

  addTranslation() {
    if (this.translationValue.trim()) {
      // Проверяем, определен ли массив this.word.translations
      if (!this.word.translations) {
        // Если массив translations не определен, создаем новый массив
        this.word.translations = [];
      }
      // Добавляем значение в массив translations
      this.word.translations.push(this.translationValue.trim());
      // Очищаем значение translationValue
      this.translationValue = '';
    }
  }
}
