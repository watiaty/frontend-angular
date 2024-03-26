import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Word} from "../word";
import {environment} from "../../environments/environment";
import {WordInfo} from "../word-info";
import {TrainRequest} from "../train-request";


const URLS = `${environment.wordUrl}`;
const URLSw = `${environment.wordsUrl}`;

@Injectable({
  providedIn: 'root',
})
export class WordService {

  constructor(private http: HttpClient) {

  }

  public findUserWords(): Observable<Word[]> {
    return this.http.get<Word[]>(URLSw + '/my');
  }

  public findWordsForTraining(trainRequest: TrainRequest): Observable<Word[]> {
    return this.http.post<Word[]>(URLSw + '/train', trainRequest);
  }

  public findAll(): Observable<Word[]> {
    return this.http.get<Word[]>(URLS + '/all');
  }

  public save(word: Word): Observable<any> {
    return this.http.post<Word>(URLSw + '/add', word);
  }

  public addTranslation(id: String): Observable<Word> {
    return this.http.post<Word>(URLSw + '/translation/add', id);
  }

  public deleteTranslation(id: String): Observable<Word> {
    return this.http.post<Word>(URLSw + '/translation/delete', id);
  }

  findWord(wordName: String, wordLang: String) {
    return this.http.get<WordInfo>(URLSw + '?word=' + wordName + "&lang=" + wordLang);
  }

  searchWords(searchText: String) {
    return this.http.get<WordInfo[]>(URLS + '/search?word=' + searchText);
  }

  addTranslationAndWord(id: String, translation: String) {
    return this.http.post<Word>(URLSw + '/translation/new', {id, translation});
  }

  deleteTranslationFromWord(id: String) {
    return this.http.post<Word>(URLSw + '/translation/fulldelete', id);
  }

  deleteUserWord(id: String) {
    return this.http.post<Word>(URLSw + '/delete', id);
  }

  setStatusLearned(id: string) {
    return this.http.post<Word>(URLSw + '/update/learned', id);
  }

  setStatusLearning(id: string) {
    return this.http.post<Word>(URLSw + '/update/learning', id);
  }
}
