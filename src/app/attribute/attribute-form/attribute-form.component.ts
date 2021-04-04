import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeNameValidators} from "./attributeNameValidators";
import {AttributeService} from "../services/attribute.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit, OnDestroy {

  id;
  form = new FormGroup({
    attrId: new FormControl(),
    attrName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)],
      AttributeNameValidators.alreadyExists(this.attributeService)),
    attrValue: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(1)])
  });

  constructor(private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.attributeService.getById(this.id).pipe(take(1)).subscribe(attr => this.form.setValue(attr));
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //TODO check whether or not I need to unsubscribe from the http Observables
  }

  save() {
    if (this.form.invalid) {
      this.form.setErrors({
        invalidSubmit: true
      });
    } else {
      this.attributeService.save(this.form.value).subscribe();
      this.router.navigate(['/attribute']);
    }
  }

  get attrName() {
    return this.form.get('attrName');
  }

  get attrValue() {
    return this.form.get('attrValue');
  }

}
