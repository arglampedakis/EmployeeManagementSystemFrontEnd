import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { AttributeFormComponent } from './Attribute/attribute-form/attribute-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AttributeFormComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
          {path: '', component: HomeComponent},
          {path: 'attribute', component: AttributeFormComponent}
        ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
