import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationTypesListComponent} from '@app/portal/features/relation-types/relation-types-list/relation-types-list.component';
import {RelationTypesFormComponent} from '@app/portal/features/relation-types/relation-types-form/relation-types-form.component';
import {SharedModule} from '@app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    RelationTypesFormComponent,
    RelationTypesListComponent
  ],
  exports: [
    RelationTypesListComponent,
    RelationTypesFormComponent
  ]
})
export class RelationTypesModule {
}
