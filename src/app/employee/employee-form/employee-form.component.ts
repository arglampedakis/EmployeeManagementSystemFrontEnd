import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {AttributeService} from "../../attribute/services/attribute.service";
import {Attribute} from "../../shared/models/attribute";
import {formatDate} from "@angular/common";
import {Employee} from "../../shared/models/employee";
import {Address} from "../../shared/models/address";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit , OnDestroy{

  private readonly attributesFormGroup = new FormGroup({}, []);

  id;
  originalEmployee: Employee = new Employee();
  originalEmployeeAttributes: Attribute[] = [];
  allAttributes: Attribute[];

  form: FormGroup = new FormGroup({
    empId: new FormControl(),
    empName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)]),
    empDateOfBirth: new FormControl('', [
      Validators.required]),
    empVehicle: new FormControl(''),
    empSupervisor: new FormControl('', [
      Validators.required]),
    addrId: new FormControl(),
    addrLongitude: new FormControl('', [
      Validators.required]),
    addrLatitude: new FormControl('', [
      Validators.required]),
    addrCountry: new FormControl('', [
      Validators.required]),
    addrCity: new FormControl('', [
      Validators.required]),
    addrStreetName: new FormControl('', [
      Validators.required]),
    addrStreetNumber: new FormControl('', [
      Validators.required]),
    addrPostalCode: new FormControl('', [
      Validators.required]),
    attributes: this.attributesFormGroup
  });

  currentlyCheckedAttributes: Attribute[] = [];
  destroy = new Subject();

  constructor(private employeeService: EmployeeService,
              private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAllAttributes();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.employeeService.getById(this.id).pipe(takeUntil(this.destroy)).subscribe(emp => {
        this.originalEmployee = emp;
        this.fillFormWithEmployee(emp);
      });
      this.fetchEmployeesAttributes();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
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
    this.attributeService.getAll().subscribe(attributes => this.allAttributes = attributes);
  }

  fetchEmployeesAttributes() {
    this.employeeService.getEmployeeAttributesById(this.id)
      .subscribe(attributes => this.originalEmployeeAttributes = this.currentlyCheckedAttributes = attributes);
  }

  hasAttribute(attrId) {
    return this.originalEmployeeAttributes.map(attr => attr.attrId).indexOf(attrId) != -1;
  }

  updateAttributes(attrId) {
    if (this.hasAttribute(attrId)) {
      let index = this.currentlyCheckedAttributes.map(attr => attr.attrId).indexOf(attrId);
      this.currentlyCheckedAttributes.splice(index, 1);
    } else {
      this.currentlyCheckedAttributes.push(
        this.allAttributes[this.allAttributes.map(attr => attr.attrId).indexOf(attrId)]
      );
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.setErrors({
        invalidSubmit: true
      });
    } else {
      let emp = new Employee(
        this.empId.value,
        this.empName.value,
        this.empDateOfBirth.value,
        this.empVehicle.value,
        this.empSupervisor.value);

      let address = new Address(
        this.addrId.value,
        this.addrLongitude.value,
        this.addrLatitude.value,
        this.addrCountry.value,
        this.addrCity.value,
        this.addrStreetName.value,
        this.addrStreetNumber.value,
        this.addrPostalCode.value,
        this.empId.value
      );

      let empAttributes = this.currentlyCheckedAttributes;

      // this.employeeService.save(this.form.value).subscribe();
      this.router.navigate(['/employee']);
    }
  }

  resetForm() {
    this.fillFormWithEmployee(this.originalEmployee);
    this.currentlyCheckedAttributes = this.originalEmployeeAttributes;
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

  get addrId() {
    return this.form.get('addrId');
  }

  get addrLongitude() {
    return this.form.get('addrLongitude');
  }

  get addrLatitude() {
    return this.form.get('addrLatitude');
  }

  get addrCountry() {
    return this.form.get('addrCountry');
  }

  get addrCity() {
    return this.form.get('addrCity');
  }

  get addrStreetName() {
    return this.form.get('addrStreetName');
  }

  get addrStreetNumber() {
    return this.form.get('addrStreetNumber');
  }

  get addrPostalCode() {
    return this.form.get('addrPostalCode');
  }

}
