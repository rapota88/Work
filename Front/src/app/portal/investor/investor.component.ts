import { Component } from '@angular/core';
import { InvestorService } from '@app/portal/investor/services/investor.service';
import { fadeAnimation, getRouterOutletState } from '@app/fade.animation';
import { BreadcrumbsService } from '@app/module/breadcrumbs';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss'],
  animations: [fadeAnimation]
})
export class InvestorComponent {

  getRouterOutletState = getRouterOutletState;

  constructor(
    public investorService: InvestorService,
    public breadcrumbsSerivce: BreadcrumbsService
  ) { }

}
