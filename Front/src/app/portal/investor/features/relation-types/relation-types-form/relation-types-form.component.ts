import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {NotificationsService} from '@app/services/notifications.service';
import {RelationTypesFormService} from '@app/portal/features/relation-types/relation-types-form/relation-types-form.service';
import {LazyLoadFilter} from '@app/core/models';
import {RelationTypesListService} from '@app/portal/features/relation-types/relation-types-list/relation-types-list.service';

@Component({
  selector: 'app-relation-types-form',
  templateUrl: './relation-types-form.component.html',
  providers: [RelationTypesFormService]
})
export class RelationTypesFormComponent implements OnInit, OnDestroy {
  @Output() validated: EventEmitter<any> = new EventEmitter();
  relationTypeData = {} as any;
  isEdit = false;
  isLoading = true;
  filter = new LazyLoadFilter();

  dataSource = [];
  private subscription = new Subscription();


  constructor(
    private helpService: RelationTypesFormService,
    private helpListService: RelationTypesListService,
    private notificationService: NotificationsService,
  ) {
  }

  ngOnInit() {
    this.subscribe();
  }

  pushData(data, edit: boolean) {
    return edit
      ? this.helpService.updateRelationType(data)
      : this.helpService.createRelationType(data);
  }

  validate(form) {
    if (!form.valid) {
      return null;
    }
    this.pushData(this.relationTypeData, this.isEdit);
  }

  subscribe() {
    const subStat = this.helpService.successStatus.subscribe(status => {
      this.notificationService.showSuccess(`Relation type has been ${status}`);
      this.validated.emit(true);
    });
    this.subscription.add(subStat);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
