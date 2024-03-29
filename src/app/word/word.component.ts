import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WordService} from "../_services/word-service.service";
import {WordInfo} from "../word-info";
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html'
})
export class WordComponent implements OnInit {
  wordName: String = "";
  wordLang: String = "";
  word: WordInfo;
  valueTranslation: String = "";
  speechSynthesis = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance();
  role?: String;

  constructor(private storageService: StorageService, private route: ActivatedRoute, private wordService: WordService) {
    this.word = new WordInfo("", "", "", "", [], []);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.wordName = params['data'];
      this.wordLang = params['lang'];
    });
    this.getWord(this.wordName, this.wordLang);
    this.role = this.storageService.getUser().role;
  }

  getWord(word: String, lang: String) {
    this.wordService.findWord(word, lang).subscribe({
        next: response => {
          this.word = new WordInfo(response.id, response.word, response.transcription, response.language, response.translations, response.hashtags);
        }
      }
    );
  }

  delete(id: String) {
    this.wordService.deleteTranslation(id).subscribe({
      next: response => {
        this.getWord(this.wordName, this.wordLang);
      },
      error: error => {
        console.error('Ошибка при сохранении', error);
      }
    });
  }

  add(id: String) {
    this.wordService.addTranslation(id).subscribe({
      next: response => {
        this.getWord(this.wordName, this.wordLang);
      },
      error: error => {
        console.error('Ошибка при сохранении', error);
      }
    });
  }


  playWord(word: String) {
    this.utterance.text = word.toString();
    this.speechSynthesis.speak(this.utterance);
  }

  stopAudio() {
    this.speechSynthesis.cancel();
  }

  onInputKeyUp() {
    this.wordService.addTranslationAndWord(this.word.id, this.valueTranslation).subscribe({
      next: response => {
        this.getWord(this.wordName, this.wordLang);
      },
      error: error => {
        console.error('Ошибка при сохранении', error);
      }
    });
  }

  deleteForever(id: String) {
    this.wordService.deleteTranslationFromWord(id).subscribe({
      next: response => {
        this.getWord(this.wordName, this.wordLang);
      },
      error: error => {
        console.error('Ошибка при сохранении', error);
      }
    });
  }
}
