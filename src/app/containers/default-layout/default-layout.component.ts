import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { AppSettings } from '../../app.settings';
import { UserService } from '../../services/user.service';
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
  navItemsToShow = [];
  public user;
  public isShowing = false;
  public password;
  public confirmPassword;
  image: File;
  url: string;
  accesses = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService
  ) {
    this.url = AppSettings.API;
  }

  ngOnInit(): void {
    this.navItemsToShow = [];
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));

      JSON.parse(sessionStorage.getItem('roles')).forEach(userrole => {
        this.accesses.push(userrole.role.name);
      });

      this.navItems.forEach(navItem => {
        if(this.accesses.includes(navItem.attributes.minAccess)) {
          this.navItemsToShow.push(navItem);
        }
      });
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.isShowing = false;
    document.getElementsByClassName('app')[0].classList.remove('aside-menu-lg-show');
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

  changePassword() {
    if (this.password) {
      if (this.password === this.confirmPassword) {
        this.userService.changePassword(this.user._id, this.password)
          .subscribe(resp => {
            this.toastService.success('Contraseña actualizada con éxito', '¡Éxito!');
            this.logout();
          });
      } else {
        this.toastService.error('Las contraseñas no coinciden', '¡Error!');
      }
    } else {
      this.toastService.error('Ingresa una contraseña', '¡Error!');
    }
  }

  upload(event) {
    this.image = event.target.files[0];
    this.userService.uploadPicture(this.user._id, this.image)
      .pipe(
        tap(resp => {
          this.toastService.success('Imagen actualizada', '¡Éxito!');
          this.user = resp.userUpdated;
          sessionStorage.setItem('user', JSON.stringify(this.user));
        })
      ).subscribe()
  }
}
