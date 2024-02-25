import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {WordService} from "../_services/word-service.service";
import {WordInfo} from "../word-info";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  searchText = new FormControl();
  lang!: string;
  words: WordInfo[] = [];
  currentUser: any;
  langs: string[];

  constructor(
    private wordService: WordService,
    private route: ActivatedRoute,
    private router: Router,
    public storageService: StorageService
  ) {
    this.currentUser = this.storageService.getUser();
    this.langs = this.currentUser.learningLang;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const {word, lang} = params;
      this.searchText.setValue(word);
      this.lang = lang;
      this.search();
    });
  }

  search() {
    const word = this.searchText.value;
    this.wordService.searchWords(word, this.lang).subscribe({
      next: response => {
        this.words = response;
      }
    });
  }

  navigateToSearch(): void {
    const queryParams = {word: this.searchText.getRawValue(), lang: this.lang};
    this.router.navigate(['/search'], {queryParams});
  }
}
