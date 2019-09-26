import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '@app/module/breadcrumbs';

@Component({
  selector: 'app-relation-type-list-wrapp',
  template: `
    <app-relation-types-list>
    </app-relation-types-list>`
})
export class RelationTypeListWrappComponent implements OnInit {
  isRegistered: boolean;
  companyTypeId: string;

  constructor(
    private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
    this.setBreadcrumbs();
  }

  private setBreadcrumbs() {
    this.breadcrumbsService.set([{
      active: false,
      name: 'Relation type',
      slug: 'root'
    }]);
  }
}
