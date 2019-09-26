import {Injectable} from '@angular/core';
import {NotificationsService} from '@app/services/notifications.service';
import {RelationTypeService} from '@app/core/services/relation-type/relation-type.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs/Rx';
import {LazyLoadFilter} from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class RelationTypesListService {
  private _relationTypeList = new BehaviorSubject([]);
  private _removeSub: Subscription;
  private _updateSub: Subscription;
  private _createSub: Subscription;
  private _removed = new Subject();
  private _successStatus = new Subject();

  removed$ = this._removed.asObservable();
  getRelationTypeList$ = this._relationTypeList.asObservable();

  constructor(
    private helpService: RelationTypeService,
    private notificationService: NotificationsService
  ) {

  }

  getRelationTypeList(filter: LazyLoadFilter, clear = false) {
    clear && this._relationTypeList.next([]);
    this.helpService.getRelationTypeList(filter).subscribe(items => {
      const res = [...this._relationTypeList.getValue(), ...items];
      this._relationTypeList.next(res);
    });
  }

  deleteFileType(ids) {
    this._removeSub && this._removeSub.unsubscribe();
    this._removeSub = this.helpService
      .deleteFileType(ids)
      .subscribe(res => {
        this.notificationService.showSuccess(res.message);
        this._removed.next(true);
      });
  }

  updateRelationType(model) {
    this._updateSub && this._updateSub.unsubscribe();
    this._updateSub = this.helpService.updateRelationType(model).subscribe(
      () => {
        this._successStatus.next('updated');
      }
    );
  }

  createRelationType(model) {
    this._createSub && this._createSub.unsubscribe();
    this._createSub = this.helpService.createRelationType(model).subscribe(
      () => {
        this._successStatus.next('created');
      }
    );
  }

  get successStatus(): Observable<any> {
    return this._successStatus.asObservable();
  }

}
