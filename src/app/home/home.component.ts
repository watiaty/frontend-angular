import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {WordService} from "../_services/word-service.service";
import {WordInfo} from "../word-info";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchText = new FormControl();
  word!: string;
  lang!: string;
  words: WordInfo[] = [];
  currentUser: any;
  langs: string[];

  constructor(private wordService: WordService, private route: ActivatedRoute, public storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.langs = this.currentUser.learningLang;
    this.route.queryParams.subscribe(params => {
      this.word = params['word'];
      this.lang = params['lang'];
      this.searchText.setValue(params['word']);
      this.search();
    });
  }

  search() {
    this.wordService.searchWords(this.word, this.lang).subscribe({
      next: response => {
        this.words = response;
      }
    });
  }
}
