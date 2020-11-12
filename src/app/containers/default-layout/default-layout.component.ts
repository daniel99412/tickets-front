import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('asideMenuTabs') asideTabs: TabsetComponent;

  public sidebarMinimized = false;
  public navItems = navItems;
  public user;
  public isShowing = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  showAside() {
    if (!document.getElementsByClassName('app')[0].classList.value.includes('aside-menu-lg-show')) {
      this.isShowing = true;
      this.asideTabs.tabs[0].active = true;
      document.getElementsByClassName('app')[0].classList.add('aside-menu-lg-show');
    } else {
      this.isShowing = false;
      document.getElementsByClassName('app')[0].classList.remove('aside-menu-lg-show');
    }
  }
}
