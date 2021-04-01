import {Component, OnInit} from '@angular/core';
import {Attribute} from "../../shared/models/attribute";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeNameValidators} from "./attributeNameValidators";
import {AttributeService} from "../services/attribute.service";

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.css']
})
export class AttributeFormComponent implements OnInit {

  form = new FormGroup({
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

  get attrName() {
    return this.form.get('attrName');
  }

  get attrValue() {
    return this.form.get('attrValue');
  }

  attribute: Attribute = new Attribute();

  constructor(private attributeService: AttributeService) {
  }

  ngOnInit(): void {

  }

  save(attribute: Attribute) {

  }

}
