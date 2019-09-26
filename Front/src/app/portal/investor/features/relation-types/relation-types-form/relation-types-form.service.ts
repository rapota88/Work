import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs/Rx';
import {RelationTypeService} from '@app/core/services/relation-type/relation-type.service';
import {LazyLoadFilter} from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class RelationTypesFormService {
  private _updateSub: Subscription;
  private _createSub: Subscription;
  private _successStatus = new Subject();
  filter = new LazyLoadFilter();

  constructor(
    private helpService: RelationTypeService,
  ) {
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
