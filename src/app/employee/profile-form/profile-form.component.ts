import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Profile} from "../../shared/models/profile";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeService} from "../../attribute/services/attribute.service";
import {Attribute} from "../../shared/models/attribute";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  id;
  hasFinished = false;
  originalProfile: Profile;
  formProfile: Profile;
  destroy = new Subject();
  private readonly attributesFormArray = new FormArray([]);

  form: FormGroup = new FormGroup({
    employee: new FormGroup({
      empId: new FormControl(),
      empName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]),
      empDateOfBirth: new FormControl('', [
        Validators.required]),
      empVehicle: new FormControl(''),
      empSupervisor: new FormControl('', [])
    }),
    address: new FormGroup({
      addrId: new FormControl(),
      addrEmpId: new FormControl(),
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
    }),
    attributes: this.attributesFormArray
  });

  constructor(private profileService: ProfileService,
              private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.profileService.getByEmpId(this.id).pipe(takeUntil(this.destroy)).subscribe(profile => {
        this.originalProfile = this.formProfile = profile;
        this.fillForm(this.formProfile);
      });
    } else {
      this.attributeService.getAll().pipe(takeUntil(this.destroy)).subscribe(attributes => {
        this.originalProfile = Profile.emptyProfile();
        this.originalProfile.attributes = attributes;
        this.formProfile = this.originalProfile;
        this.fillForm(this.formProfile);
      });

    }
  }

  fillForm(profile: Profile) {
    this.employee.setValue(profile.employee);
    this.address.setValue(profile.address);
    profile.attributes.forEach(attr => {
      this.attributesFormArray.push(new FormControl(attr.selected));
    });
    if (profile.employee.empDateOfBirth) {
      this.form.controls.employee.get('empDateOfBirth')
        .setValue(formatDate(new Date(profile.employee.empDateOfBirth), 'yyyy-MM-dd', 'en'));
    }
    this.hasFinished = true;
  }

  //TODO will delete this and create an onSubmit()
  onAttributeChange(attr: Attribute) {
    const selectedAttrs = this.form.value.attributes
      .map((isChecked, i) => isChecked ? this.formProfile.attributes[i] : null)
      .filter(v => v !== null);
    console.log(selectedAttrs);
  }
  //TODO fix this
  resetForm(){
    this.formProfile = this.originalProfile;
    this.fillForm(this.formProfile);
  }
  ngOnDestroy(): void {
    this.destroy.next();
  }

  get employee() {
    return this.form.get('employee');
  }

  get empId() {
    return this.employee.get('empId');
  }

  get empName() {
    return this.employee.get('empName');
  }

  get empDateOfBirth() {
    return this.employee.get('empDateOfBirth');
  }

  get empVehicle() {
    return this.employee.get('empVehicle');
  }

  get empSupervisor() {
    return this.employee.get('empSupervisor');
  }

  get address() {
    return this.form.get('address');
  }

  get addrId() {
    return this.address.get('addrId');
  }

  get addrLongitude() {
    return this.address.get('addrLongitude');
  }

  get addrLatitude() {
    return this.address.get('addrLatitude');
  }

  get addrCountry() {
    return this.address.get('addrCountry');
  }

  get addrCity() {
    return this.address.get('addrCity');
  }

  get addrStreetName() {
    return this.address.get('addrStreetName');
  }

  get addrStreetNumber() {
    return this.address.get('addrStreetNumber');
  }

  get addrPostalCode() {
    return this.address.get('addrPostalCode');
  }

  get attributes() {
    return this.form.controls.attributes as FormArray;
  }
}
