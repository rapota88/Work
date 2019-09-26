import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class RelationTypeRestService {
  private readonly BASE_URL = `${environment.host}/api/RelationType`;

  constructor(
    private httpClient: HttpClient
  ) {}

   getRelationTypeList(filter, isPaginationRequired = true): Observable<any> {
    return this.httpClient.post(
      `${this.BASE_URL}/List`,
      {...filter.getObject(), isPaginationRequired}
    );
  }

   createRelationType(model: {
    name: string;
  }) {
    return this.httpClient.post(`${this.BASE_URL}/Create`, model);
  }

   updateRelationType(model: {
    id: string;
    name: string;
    createdDate: string;
    createdBy: string;
  }) {
    return this.httpClient.put(`${this.BASE_URL}/Update`, model);
  }

   deleteFileType(ids) {
    return this.httpClient.request(
      'delete',
      `${this.BASE_URL}/Delete`,
      {body: {ids: ids}},
    );
  }
}
