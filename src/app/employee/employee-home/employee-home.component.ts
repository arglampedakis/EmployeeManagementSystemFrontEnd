import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../../shared/models/employee";

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  filteredEmployees: Employee[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  deletionMessage: Boolean;

  constructor(private employeeService: EmployeeService) {
    this.fetchTableData();
  }

  fetchTableData() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.employeeService.getAll()
      .pipe(
        map(actions =>
          actions.map(action => {
              const data = action as Employee;
              this.dtTrigger.next();
              return data;
            }
          )))
      .subscribe(employees => this.employees = this.filteredEmployees = employees);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true
    };
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredEmployees = (query) ?
      this.employees.filter(e => e.empName.toLowerCase().includes(query.toLowerCase())) :
      this.employees;
  }

  delete(id){
    if (confirm('Are you sure you want to delete this employee?')) {
      this.deletionMessage = true;
      // this.attributeService.delete(id).subscribe(x => this.fetchTableData());
      this.fadeOutLink();
    }
  }

  fadeOutLink() {
    setTimeout( () => {
      this.deletionMessage = false;
    }, 2000);
  }
}
