import { Component, TemplateRef, ViewChild } from '@angular/core';

import {
  DATATABLE_COMPONENTS,
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';
import '../themes/material.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>template refs</h3>
      <datatable
        class="material"
        [rows]="rows"
        [options]="options">
      </datatable>

      <template #editTmpl let-row="row" let-value="value" let-i="index">
        <img
          *ngIf="value === 'male'"
          width="150"
          src="https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif"
        />
        <img
          *ngIf="value === 'female'"
          width="150"
          src="https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif"
        />
      </template>
    </div>
  `,
  directives: [ DATATABLE_COMPONENTS ]
})
export class App {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;

  rows = [];
  options: TableOptions;

  constructor() {
    this.fetch((data) => {
      this.rows.push(...data.splice(0, 5));
    });
  }

  ngOnInit() {
    this.options = new TableOptions({
      columnMode: ColumnMode.force,
      headerHeight: 50,
      footerHeight: 50,
      rowHeight: 'auto',
      columns: [
        new TableColumn({
          template: this.editTmpl,
          name: 'Gender'
        })
      ]
    });
  }

  fetch(cb) {
    let req = new XMLHttpRequest();
    req.open('GET', `src/demos/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
