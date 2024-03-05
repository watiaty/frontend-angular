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
  selectedLang: any;
  inputValue: string = '';
  alertVisible: boolean = false;
  translateVisible: boolean = false;
  trainRequest: TrainRequest;

  constructor(private wordService: WordService, private storageService : StorageService) {
    this.currentUser = this.storageService.getUser();
    this.langs = this.currentUser.learningLang;
    if (this.langs.length > 0) {
      this.selectedLang = this.langs[0];
    }
    this.rangeValue = 10;
    this.trainRequest = new TrainRequest();
    this.trainRequest.status = 'LEARNING';
  }

  startTrain() {
    this.visible = false;
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
    this.selectedLang = $event.value;
  }
}
