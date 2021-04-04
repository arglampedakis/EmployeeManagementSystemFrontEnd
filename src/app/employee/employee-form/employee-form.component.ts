import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {map, take} from "rxjs/operators";
import {EmployeeService} from "../services/employee.service";
import {AttributeService} from "../../attribute/services/attribute.service";
import {Attribute} from "../../shared/models/attribute";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  id;
  form = new FormGroup({
    empId: new FormControl(),
    empName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)]),
    empDateOfBirth: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(1)]),
    empVehicle: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(1)]),
    empSupervisor: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(1)])
  });

  attributes: Attribute[];
  employeesAttributes: Attribute[] = [];

  constructor(private employeeService: EmployeeService,
              private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAllAttributes();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.employeeService.getById(this.id).pipe(take(1)).subscribe(emp => this.form.setValue(emp));
      this.fetchEmployeesAttributes();
    }
  }

  fetchAllAttributes(){
    this.attributeService.getAll().subscribe(attributes => this.attributes = attributes);
  }

  fetchEmployeesAttributes(){
    this.employeeService.getEmployeeAttributesById(this.id).subscribe( attributes => this.employeesAttributes = attributes);
  }

  hasAttribute(attrId){
    //TODO this is not working
    return this.employeesAttributes.indexOf(this.attributes.find(attr => attr.attrId == attrId)) != -1;
  }

  save() {
    if (this.form.invalid) {
      this.form.setErrors({
        invalidSubmit: true
      });
    } else {
      this.employeeService.save(this.form.value).subscribe();
      this.router.navigate(['/employee']);
    }
  }

  get empName() {
    return this.form.get('empName');
  }

  get empDateOfBirth() {
    return this.form.get('empDateOfBirth');
  }

  get empVehicle() {
    return this.form.get('empVehicle');
  }

  get empSupervisor() {
    return this.form.get('empSupervisor');
  }

}
