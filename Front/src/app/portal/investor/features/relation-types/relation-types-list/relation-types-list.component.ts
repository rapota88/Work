import {Component, OnDestroy, OnInit,  ViewChild} from '@angular/core';
import {MaterialTableService} from '@app/portal/components/material-table';
import {SelectionModel} from '@angular/cdk/collections';
import {NotificationsService} from '@app/services/notifications.service';
import {ConfirmationService} from '@app/services/confirmation.service';
import {Subscription} from 'rxjs/Rx';
import {LazyLoadFilter} from '@app/core/models';
import {RelationTypesListService} from '@app/portal/features/relation-types/relation-types-list/relation-types-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-relation-types-list',
  templateUrl: './relation-types-list.component.html',
  providers: [RelationTypesListService]
})
export class RelationTypesListComponent implements OnInit, OnDestroy {
  cancelScroll = false;
  isEdit = false;
  relationTypeData = {} as any;
  filter = new LazyLoadFilter();
  selected: any[];
  isLoading = true;

  dataSource = [];
  selection = new SelectionModel(true, []);

  subscription = new Subscription();
  searchTimeout: any;


  @ViewChild('RelationModal') RelationModal;


  constructor(
    private helpService: RelationTypesListService,
    private matTableService: MaterialTableService,
    private notificationService: NotificationsService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  validate(form) {
    if (!form.valid) {
      return null;
    }
    this.pushData(this.relationTypeData, this.isEdit);

  }

  getRelationTypeList(clear = false) {
    this.isLoading = true;
    this.helpService
      .getRelationTypeList(this.filter, clear);
    const subType = this.helpService.getRelationTypeList$.subscribe(res => {
      this.dataSource = res;
      this.isLoading = false;
    });
    this.subscription.add(subType);
  }

  applyFilter() {
    this.searchTimeout && clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filter.resetPage();
      this.getRelationTypeList(true);
    }, 400);
  }

  removeRelationType() {
    this.helpService.deleteFileType(
      this.selection.selected.map(item => item.id)
    );
  }

  onPublish() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the Relation Type ?',
      header: 'Delete Relation Type ',
      accept: () => {
        this.removeRelationType();
      },
    });
  }

  clear() {
    this.relationTypeData = {} as any;
  }

  getById(row) {
    this.relationTypeData.createdBy = row.createdBy;
    this.relationTypeData.createdDate = row.createdDate;
    this.relationTypeData.name = row.name;
    this.relationTypeData.id = row.id;
  }

  pushData(data, edit: boolean) {
    return edit
      ? this.helpService.updateRelationType(data)
      : this.helpService.createRelationType(data);
  }

  onScroll() {
    if (!this.cancelScroll) {
      this.filter.nextPage();
      this.getRelationTypeList();
    }
  }

  subscribe() {
    const sub = this.helpService.removed$.subscribe(() => {
      this.filter.reset();
      this.getRelationTypeList(true);
    });
    this.subscription.add(sub);
    const subStat = this.helpService.successStatus.subscribe(status => {
      this.selection.clear();
      this.getRelationTypeList(true);
      this.notificationService.showSuccess(`Relation type has been ${status}`);
      this.RelationModal.close();
    });
    this.subscription.add(subStat);
  }

  private subscribeQueryParams() {
    this.route.queryParams.subscribe(params => {
      const path = '/portal/investor/relation-type';
      if (params['update']) {
        this.getRelationTypeList(true);
        this.router.navigate([path]).then();
      }
    });
  }

  ngOnInit() {
    this.subscribe();
    !this.router.url.includes('update') && this.getRelationTypeList(true);
    this.subscribeQueryParams();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
