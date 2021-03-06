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
import { GoogleMapsModule } from '@angular/google-maps'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { ProfileFormComponent } from './employee/profile-form/profile-form.component';
import { MapComponent } from './map/my-map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AttributeFormComponent,
    AttributesHomeComponent,
    EmployeeHomeComponent,
    EmployeeFormComponent,
    ProfileFormComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'attribute/form/new', component: AttributeFormComponent},
      {path: 'attribute/form/:id', component: AttributeFormComponent},
      {path: 'attribute', component: AttributesHomeComponent},
      {path: 'employee/form/new', component: ProfileFormComponent},
      {path: 'employee/form/:id', component: ProfileFormComponent},
      {path: 'employee', component: EmployeeHomeComponent},
      {path: 'map', component: MapComponent}
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
