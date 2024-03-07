import { Component } from '@angular/core';
import {WordService} from "../_services/word-service.service";
import {Word} from "../word";
import {TrainRequest} from "../train-request";
import {StorageService} from "../_services/storage.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrl: './train.component.css'
})
export class TrainComponent {
  rangeValue: number;
  visible: boolean = true;
  words: Word[] = [];
  id: number = 0;
  langs!: string[];
  currentUser: any;
  inputValue: string = '';
  alertVisible: boolean = false;
  translateVisible: boolean = false;
  trainRequest: TrainRequest;
  checked = false;

  constructor(private wordService: WordService, private storageService : StorageService) {
    this.currentUser = this.storageService.getUser();
    this.langs = this.currentUser.learningLang;
    this.rangeValue = 10;
    this.trainRequest = new TrainRequest();
    if (this.langs.length > 0) {
      this.trainRequest.language = this.langs[0];
    }
  }

  startTrain() {
    this.visible = false;
    if (this.checked) this.trainRequest.quantity = 0;
    this.wordService.findWordsForTraining(this.trainRequest).subscribe({
        next: response => {
          this.words = response;
        }
      }
    );
  }

  onInputKeyUp() {
    if (this.words[this.id].word === this.inputValue) {
      if (!this.translateVisible) {
        this.wordService.setStatusLearned(this.words[this.id].id).subscribe();
      } else {
        this.wordService.setStatusLearning(this.words[this.id].id).subscribe();
      }
      this.alertVisible = false;
      this.translateVisible = false;
      this.id++;
      this.inputValue = "";
    } else {
      this.alertVisible = true;
    }
  }

  changeLanguage($event: MatSelectChange) {
    this.trainRequest.language = $event.value;
  }
}
