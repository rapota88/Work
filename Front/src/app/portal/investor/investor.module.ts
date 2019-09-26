import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { InvestorRoutingModule } from './investor-routing.module';
import { InvestorComponent } from './investor.component';
import { SharedModule } from '../../shared.module';
import { OldShareModule } from '@app/portal/investor/old-shared.module';
import { WatchlistModule } from '@app/portal/investor/watchlist/watchlist.module';
import { ProductModule } from '@app/portal/investor/product/product.module';
import { BreadcrumbsModule } from '@app/module/breadcrumbs';

@NgModule({
  imports: [
    CommonModule,
    InvestorRoutingModule,
    SharedModule,
    OldShareModule,
    WatchlistModule,
    ProductModule,
    DropdownModule,
    BreadcrumbsModule,
  ],
  exports: [],
  declarations: [InvestorComponent],
})
export class InvestorModule {}
