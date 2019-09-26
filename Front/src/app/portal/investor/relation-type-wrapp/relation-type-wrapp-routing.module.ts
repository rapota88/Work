import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelationTypeListWrappComponent } from '@app/portal/investor/relation-type-wrapp/relation-type-list-wrapp/relation-type-list-wrapp.component';

const routes: Routes = [
  {
    path: '',
    component: RelationTypeListWrappComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationTypeWrappRoutingModule { }
