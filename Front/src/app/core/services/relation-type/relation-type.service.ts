import {Injectable} from '@angular/core';
import {RelationTypeRestService} from '@app/core/services/relation-type/relation-type-rest.service';
import {Observable} from 'rxjs/Rx';
import {map} from 'rxjs/operators';
import {LazyLoadFilter} from '@app/core/models';


@Injectable({
  providedIn: 'root'
})
export class RelationTypeService {
  constructor(private restService: RelationTypeRestService) {
  }

  getRelationTypeList(filter: LazyLoadFilter, isPaginationRequired = true): Observable<any> {
    return this.restService.getRelationTypeList(filter, isPaginationRequired).pipe(map(res => res.data.items));
  }

  createRelationType(model): Observable<any> {
    return this.restService.createRelationType(model);
  }

  updateRelationType(model): Observable<any> {
    return this.restService.updateRelationType(model);
  }

  deleteFileType(ids): Observable<any> {
    return this.restService.deleteFileType(ids);
  }
}
