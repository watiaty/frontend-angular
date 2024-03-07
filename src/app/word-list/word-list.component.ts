import { Component, OnInit, ViewChild } from '@angular/core';
import { Word } from "../word";
import { WordService } from "../_services/word-service.service";
import { MatSelectChange } from "@angular/material/select";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { StorageService } from "../_services/storage.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './word-list.component.html'
})
export class WordListComponent implements OnInit {
  words: Word[] = [];
  selectedLang: any;
  selectedStatus: boolean;
  langs!: string[];
  currentUser: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['word', 'transcription', 'translations', 'star'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private wordService: WordService, public storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.langs = this.currentUser.learningLang;
    if (this.langs.length > 0) {
      this.selectedLang = this.langs[0];
    }
    this.selectedStatus = true;
  }

  ngOnInit() {
    this.loadWords();
  }

  changeLanguage($event: MatSelectChange) {
    this.selectedLang = $event.value;
    this.updateDataSource();
  }

  changeStatus(status: boolean) {
    this.selectedStatus = status;
    this.updateDataSource();
  }

  delete(id: String) {
    this.wordService.deleteUserWord(id).subscribe({
      next: response => {
        this.loadWords();
      },
      error: error => {
        console.error('Ошибка при сохранении', error);
      }
    });
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource(this.words.filter(word => word.lang === this.selectedLang));
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadWords() {
    this.wordService.findUserWords().subscribe(response => {
      this.words = response;
      this.updateDataSource();
    });
  }
}
