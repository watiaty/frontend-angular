import { Component } from '@angular/core';
import {WordService} from "../_services/word-service.service";
import {Word} from "../word";
import {style} from "@angular/animations";
import {max, min} from "rxjs";
import {TrainRequest} from "../train-request";

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
  inputValue: string = '';
  alertVisible: boolean = false;
  translateVisible: boolean = false;
  trainRequest: TrainRequest;

  constructor(private wordService: WordService) {
    this.rangeValue = 10;
    this.trainRequest = new TrainRequest();
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
      if (!this.alertVisible) this.wordService.setStatusLearned(this.words[this.id].id).subscribe();
      this.alertVisible = false;
      this.translateVisible = false;
      this.id++;
      this.inputValue = "";
    } else {
      this.alertVisible = true;
    }
  }
}
