// <reference path="mandates/shared/team/team.component.ts"/>
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestorComponent } from '@app/portal/investor/investor.component';
import { MandatesComponent } from '@app/portal/investor/mandates/mandates.component';
import { MandateListComponent } from '@app/portal/investor/mandates/mandate-list/mandate-list.component';
import { MandateSingleComponent } from '@app/portal/investor/mandates/mandate-single/mandate-single.component';
import { StageListComponent } from '@app/portal/investor/mandates/stage-list/stage-list.component';
import { ManagerMandatesComponent } from '@app/portal/investor/mandates/shared/manager-tab/manager-mandates/manager-mandates.component';
import { TeamComponent } from '@app/portal/investor/mandates/shared/team/team.component';
import { DocumentSingleComponent } from '@app/portal/investor/mandates/shared/document-single/document-single.component';
// tslint:disable-next-line:max-line-length
import { GeneralInformationTabComponent } from '@app/portal/investor/mandates/shared/general-information-tab/general-information-tab.component';
import { StageSingleComponent } from '@app/portal/investor/mandates/stage-single/stage-single.component';
import { ManagerStageComponent } from '@app/portal/investor/mandates/shared/manager-tab/manager-stage/manager-stage.component';
import { DocumentsComponent } from '@app/portal/investor/mandates/components/documents/documents.component';
import { TaskListComponent } from '@app/portal/investor/mandates/components/task/tasklist.component';
import { RelationMandateLevelWrapperComponent } from '@app/portal/investor/mandates/components/relations-tab/relations-mandate-level-wrapper.component';
import { CreacteMandateComponent } from '@app/portal/investor/mandates/creacte-mandate/creacte-mandate.component';
import {
  WatchlistComponent,
  WatchlistProductsComponent,
} from '@app/portal/investor/watchlist/watchlist.module';
import { ProductDetailsComponent } from '@app/portal/investor/product/product-details/product-details.component';
import { QuestionnaireRelationListWrapComponent } from '@app/portal/investor/mandates/questionnaire-level-wrap/tabs/questionnaire-relation-list-wrap/questionnaire-relation-list-wrap.component';
import { FileListMandateWrapComponent } from '@app/portal/investor/mandates/components/file-list-mandate-wrap/file-list-mandate-wrap.component';
import { FileListStageWrapComponent } from '@app/portal/investor/mandates/components/file-list-stage-wrap/file-list-stage-wrap.component';
import { TaskListMandateWrapComponent } from '@app/portal/investor/mandates/components/task-list-mandate-wrap/task-list-mandate-wrap.component';
import { TaskListStageWrapComponent } from '@app/portal/investor/mandates/components/task-list-stage-wrap/task-list-stage-wrap.component';
import { MandateManagerFormComponent } from './mandates/shared/manager-tab/manager-mandates/mandate-manager-form/mandate-manager-form.component';
import { MandateTeamWrappComponent } from './mandates/shared/mandate-team-wrapp/mandate-team-wrapp.component';
import { StageTeamWrappComponent } from './mandates/shared/stage-team-wrapp/stage-team-wrapp.component';
import { CheckListWrappComponent } from './mandates/shared/check-list/check-list-wrapp.component';
import { FileInFolderListMandateWrapComponent } from './mandates/components/file-in-folder-list-mandate-wrap/file-in-folder-list-mandate-wrap.component';
import { FileInFolderStageWrapComponent } from '@app/portal/investor/mandates/components/file-in-folder-stage-wrap/file-in-folder-stage-wrap.component';
import { InvestorGuard } from '@app/services/guards/investor.guard';
const routes: Routes = [
  {
    path: '',
    component: InvestorComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },

      {
        path: 'home',
        loadChildren: '@app/portal/investor/home/home.module#HomeModule',
        data: { breadcrumb: 'Home' },
      },
      {
        path: 'questionnaire-preview/:questionnaireId',
        loadChildren:
          './questionnaire-preview/questionnaire-preview.module#QuestionnairePreviewModule',
        data: { breadcrumb: 'Questionnaire preview' },
      },
      {
        path: 'relations',
        loadChildren:
          '@app/portal/investor/relations/relations.module#RelationsModule',
        data: { breadcrumb: 'Relations' },
      },
      {
        path: 'reports',
        loadChildren:
          '@app/portal/investor/reports/reports.module#ReportsModule',
        data: { breadcrumb: 'Reports' },
      },
      {
        path: 'notification',
        loadChildren:
          '@app/portal/investor/notifications/notifications.module#InvestorNotificationsModule',
        data: { breadcrumb: 'Notification' },
      },
      {
        path: 'tasks',
        loadChildren: '@app/portal/investor/tasks/tasks.module#TasksModule',
        data: { breadcrumb: 'Tasks' },
      },
      {
        path: 'products',
        loadChildren:
          '@app/portal/investor/products-page/products-page.module#ProductsPageModule',
        data: { breadcrumb: 'Products' },
      },
      {
        path: 'reviews',
        loadChildren:
          '@app/portal/investor/reviews/reviews.module#ReviewsModule',
        data: { breadcrumb: 'Reviews' },
      },
      {
        path: 'responses',
        loadChildren:
          '@app/portal/investor/responses/responses.module#ResponsesModule',
        data: { breadcrumb: 'Responses' },
      },
      {
        path: 'managers',
        loadChildren:
          '@app/portal/investor/managers/managers.module#ManagersModule',
        data: { breadcrumb: 'Managers' },
      },
      {
        path: 'settings',
        loadChildren:
          '@app/portal/investor/settings/user-settings.module#UserSettingsModule',
        data: { breadcrumb: 'Settings' },
      },
      {
        path: 'questionnaires',
        loadChildren:
          '@app/portal/investor/questionnaires/questionnaire-list-wrap/questionnaire-list-wrap.module#QuestionnaireListWrapModule',
      },
      {
        path: 'questionnaires/:questionnaireId',
        loadChildren:
          '@app/portal/investor/questionnaires/questionnaire-level-wrap/questionnaire-level-wrap.module#QuestionnaireLevelWrapModule',
      },
      {
        path: 'mandates',
        component: MandatesComponent,
        children: [
          { path: '', component: MandateListComponent },
          { path: 'createmandate', component: CreacteMandateComponent },
          {
            path: 'updatemandate/:mandateId',
            component: CreacteMandateComponent,
          },
          {
            path: 'mandate/:mandateId',
            component: MandateSingleComponent,
            children: [
              { path: '', component: StageListComponent },
              {
                path: 'managers',
                component: ManagerMandatesComponent,
              },
              {
                path: 'team',
                component: MandateTeamWrappComponent,
              },
              {
                path: 'managers/create',
                component: MandateManagerFormComponent,
              },
              { path: 'documents', component: FileListMandateWrapComponent },
              { path: 'documents/:folderId', component: FileInFolderListMandateWrapComponent },
              { path: 'tasks', component: TaskListMandateWrapComponent },
              {
                path: 'relations',
                component: RelationMandateLevelWrapperComponent,
              },
              {
                path: 'general-info',
                component: GeneralInformationTabComponent,
              },
            ],
          },
          {
            path: 'mandate/:mandateId/stage/:stageId',
            component: StageSingleComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'questionnaire',
              },
              {
                path: 'manager',
                component: ManagerStageComponent,
                pathMatch: 'full',
              },
              {
                path: 'documents',
                component: FileListStageWrapComponent,
                pathMatch: 'full',
              },
              {
                path: 'team',
                component: StageTeamWrappComponent,
              },
              {
                path: 'checklist',
                component: CheckListWrappComponent,
              },
              {
                path: 'documents/:folderId',
                component: FileInFolderStageWrapComponent,
                pathMatch: 'full',
              },
              {
                path: 'tasks',
                component: TaskListStageWrapComponent,
                pathMatch: 'full',
              },
              {
                path: 'tasks/:taskId',
                component: TaskListComponent,
                pathMatch: 'full',
              },
              {
                path: 'relations',
                component: QuestionnaireRelationListWrapComponent,
                pathMatch: 'full',
              },
              {
                path: 'questionnaire',
                loadChildren:
                  '@app/portal/investor/mandates/questionnaire-list-wrap/questionnaire-list-wrap.module#QuestionnaireListWrapModule',
              },
              {
                path: 'questionnaire/:questionnaireId',
                loadChildren:
                  '@app/portal/investor/mandates/questionnaire-level-wrap/questionnaire-level-wrap.module#QuestionnaireLevelWrapModule',
              },
            ],
          },
        ],
      },
      {
        path: 'workflows',
        loadChildren:
          '@app/portal/investor/workflows/workflows.module#WorkflowsModule',
        data: { breadcrumb: 'Workflows' },
      },
      {
        path: 'files',
        loadChildren:
          '@app/portal/investor/documents/documents.module#DocumentsModule',
        data: { breadcrumb: 'Files' },
      },
      {
        path: 'watchlist',
        component: WatchlistComponent,
      },
      {
        path: 'watchlist/:id',
        component: WatchlistProductsComponent,
      },
      {
        path: 'watchlist/:id/products/:productId',
        loadChildren:
          './watchlist/watchlist-product-details/watchlist-product-details.module#WatchlistProductDetailsModule',
      },
      {
        path: 'filetypes',
        loadChildren:
          '@app/portal/investor/filetypes/filetypes.module#FiletypesModule',
        data: { breadcrumb: 'Filetypes' },
      },
      {
        path: 'tasktypes',
        loadChildren:
          '@app/portal/investor/task-type/task-type.module#TaskTypeModule',
        data: { breadcrumb: 'TaskTypes' },
      },
      {
        path: 'reviewsettings',
        loadChildren:
          '@app/portal/investor/review-settings/review-settings.module#ReviewSettingsModule',
        data: { breadcrumb: 'ReviewSettings' },
      },
      {
        path: 'users',
        loadChildren: '@app/portal/investor/users/users.module#UsersModule',
        data: { breadcrumb: 'Users' },
      },
      {
        path: 'accesabilitysettings',
        loadChildren:
          '@app/portal/investor/accesability-settings/accesability-settings.module#AccesabilitySettingsModule',
        data: { breadcrumb: 'accesability-settings' },
      },

      {
        path: 'relation-type',
        loadChildren:
          '@app/portal/investor/relation-type-wrapp/relation-type-wrapp.module#RelationTypeWrappModule',
        data: { breadcrumb: 'Relation type' },
      },
      {
        path: 'audit-trail',
        loadChildren:
          '@app/portal/investor/audit-trail/audit-trail.module#AuditTrailModule',
        data: { breadcrumb: 'AuditTrail' },
      },
      {
        path: 'custom-fields',
        loadChildren: '@app/portal/investor/custom-fields/custom-fields.module#CustomFieldsModule',
        data: { breadcrumb: 'CustomFields' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorRoutingModule {}
