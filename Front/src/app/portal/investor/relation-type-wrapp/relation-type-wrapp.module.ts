import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule} from '@app/shared.module';
import { RelationTypeWrappRoutingModule } from './relation-type-wrapp-routing.module';
import { RelationTypeListWrappComponent } from './relation-type-list-wrapp/relation-type-list-wrapp.component';
import { RelationModule } from '@app/portal/features/relation/relation.module';
import {RelationTypesModule} from '@app/portal/features/relation-types/relation-types.module';

@NgModule({
  imports: [
    CommonModule,
    RelationTypeWrappRoutingModule,
    SharedModule,
    RelationModule,
    RelationTypesModule
  ],
  declarations: [
    RelationTypeListWrappComponent,
  ]
})
export class RelationTypeWrappModule { }
