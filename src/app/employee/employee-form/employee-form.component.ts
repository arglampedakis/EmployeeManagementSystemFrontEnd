import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {AttributeService} from "../../attribute/services/attribute.service";
import {Attribute} from "../../shared/models/attribute";
import {formatDate} from "@angular/common";
import {Employee} from "../../shared/models/employee";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  id;
  originalEmployee: Employee = new Employee();
  form: FormGroup;
  // form = new FormGroup({
  //   empId: new FormControl(),
  //   empName: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.minLength(2)]),
  //   empDateOfBirth: new FormControl('', [
  //     Validators.required]),
  //   empVehicle: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.minLength(1)]),
  //   empSupervisor: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.minLength(1)])
  // });

  attributes: Attribute[];
  employeesAttributes: Attribute[] = [];

  constructor(private employeeService: EmployeeService,
              private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      empId: new FormControl(),
      empName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)]),
      empDateOfBirth: new FormControl('', [
        Validators.required]),
      empVehicle: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1)]),
      empSupervisor: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1)]),
      attributesList: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchAllAttributes();

    if (this.id) {
      this.employeeService.getById(this.id).subscribe(emp => {
        this.originalEmployee = emp;
        this.fillFormWithEmployee(emp);
      });
      this.fetchEmployeesAttributes();
    }


  }

  fillFormWithEmployee(emp) {
    this.form.controls.empId.setValue(emp.empId);
    this.form.controls.empName.setValue(emp.empName);
    if (emp.empDateOfBirth) {
      this.form.controls.empDateOfBirth.setValue(formatDate(new Date(emp.empDateOfBirth), 'yyyy-MM-dd', 'en'));
    }
    this.form.controls.empVehicle.setValue(emp.empVehicle);
    this.form.controls.empSupervisor.setValue(emp.empSupervisor);
  }

  fetchAllAttributes() {
    this.attributeService.getAll().subscribe(attributes => {
      this.attributes = attributes;
      this.attributes.forEach(attr => {
        (this.form.get('attributesList') as FormArray).push(this.createAttribute(attr));
      });
    });

  }

  fetchEmployeesAttributes() {
    this.employeeService.getEmployeeAttributesById(this.id).subscribe(attributes => this.employeesAttributes = attributes);
  }

  hasAttribute(attrId) {
    return this.employeesAttributes.map(attr => attr.attrId).indexOf(attrId) != -1;
  }

  save() {
    if (this.form.invalid) {
      this.form.setErrors({
        invalidSubmit: true
      });
    } else {
      // this.employeeService.save(this.form.value).subscribe();
      this.router.navigate(['/employee']);
    }
  }

  createAttribute(attr: Attribute): FormGroup {
    return this.formBuilder.group(attr);
  }

  resetForm() {
    this.fillFormWithEmployee(this.originalEmployee);
  }

  get empId() {
    return this.form.get('empId');
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

  get attributesList() {
    return this.form.get('attributesList')['controls'];
  }

}
