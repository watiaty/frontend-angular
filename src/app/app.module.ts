import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {WordListComponent} from "./word-list/word-list.component";
import {WordFormComponent} from "./word-form/word-form.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {HttpRequestInterceptor} from "./_helpers/http.interceptor";
import {WordComponent} from './word/word.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatFormField, MatInput, MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatAnchor, MatButton, MatFabAnchor, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatSelect} from "@angular/material/select";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {TrainComponent} from "./train/train.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import { HomeComponent } from './home/home.component';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatChip, MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    WordListComponent,
    WordFormComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    WordComponent,
    TrainComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatAutocomplete,
    MatOption,
    MatPaginatorModule,
    MatAutocompleteTrigger,
    MatAutocompleteModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAnchor,
    MatSelect,
    BrowserAnimationsModule,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginator,
    MatIcon,
    MatIconButton,
    MatFabButton,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatCardContent,
    MatCard,
    MatFabAnchor,
    MatToolbar,
    MatListItemLine,
    MatListItemTitle,
    MatListItem,
    MatList,
    MatDivider,
    MatGridList,
    MatGridTile,
    MatChipGrid,
    MatChipInput,
    MatChipRow,
    MatChipRemove,
    MatChip,
    MatNoDataRow,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
