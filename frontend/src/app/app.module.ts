import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SummaryInputComponent } from './summary-input/summary-input.component';
import { SummaryOutputComponent } from './summary-output/summary-output.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { FooterComponent } from './footer/footer.component';
import { AcronymsListComponent } from './acronyms-list/acronyms-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SummaryInputComponent,
    SummaryOutputComponent,
    LoadingSpinnerComponent,
    KeywordListComponent,
    FooterComponent,
    AcronymsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,

    MatToolbarModule,
    MatButtonModule,

    MatSelectModule,
    MatListModule,

    HttpClientModule,

    MatProgressSpinnerModule,

    MatExpansionModule,

    NgxMatColorPickerModule
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
