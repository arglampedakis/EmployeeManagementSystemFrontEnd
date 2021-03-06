import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Attribute} from "../../shared/models/attribute";
import {AttributeService} from "../services/attribute.service";


@Component({
  selector: 'app-attributes-home',
  templateUrl: './attributes-home.component.html',
  styleUrls: ['./attributes-home.component.css']
})
export class AttributesHomeComponent implements OnInit, OnDestroy {

  attributes: Attribute[] = [];
  filteredAttributes: Attribute[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  deletionMessage: Boolean;

  constructor(private attributeService: AttributeService) {
    this.fetchTableData();
  }

  fetchTableData() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.attributeService.getAll()
      .pipe(
        map(actions =>
          actions.map(action => {
              const data = action as Attribute;
              // this.dtTrigger.next();
              return data;
            }
          )))
      .subscribe(attributes => {
        this.attributes = this.filteredAttributes = attributes;
        this.dtTrigger.next();
      });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  delete(id) {
    if (confirm('Are you sure you want to delete this attribute?')) {
      this.deletionMessage = true;
      this.attributeService.delete(id).subscribe(x => this.fetchTableData());
      this.fadeOutLink();
    }
  }
  //TODO find out how this filter works
  filter(query: string) {
    this.filteredAttributes = (query) ?
      this.attributes.filter(a => a.attrName.toLowerCase().includes(query.toLowerCase())) :
      this.attributes;
  }

  fadeOutLink() {
    setTimeout( () => {
      this.deletionMessage = false;
    }, 2000);
  }

}
