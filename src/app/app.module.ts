import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {FooterComponent} from './core/footer/footer.component';
import {HomeComponent} from './core/home/home.component';
import {AttributeFormComponent} from './attribute/attribute-form/attribute-form.component';
import {AttributesHomeComponent} from './attribute/attributes-home/attributes-home.component';
import {DataTablesModule} from "angular-datatables";
import {HttpClientModule} from "@angular/common/http";
import {AttributeService} from "./attribute/services/attribute.service";
import {AppErrorHandler} from './shared/errors/app-error-handler';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AttributeFormComponent,
    AttributesHomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'attribute/form', component: AttributeFormComponent},
      {path: 'attribute', component: AttributesHomeComponent}
    ])
  ],
  providers: [
    AttributeService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
