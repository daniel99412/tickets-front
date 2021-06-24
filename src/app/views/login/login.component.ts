import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserRoleService } from '../../services/userRole.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm =  new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor( 
    private loginService: LoginService,
    private userRoleService: UserRoleService,
    private router: Router
   ) {}

  login() {
    this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe( resp => {
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('user', JSON.stringify(resp.user));

        this.userRoleService.getRoles(resp.user._id).subscribe( userRoles => {
          sessionStorage.setItem('roles', JSON.stringify(userRoles.roles));

          if (sessionStorage.getItem('token')) {
            this.router.navigate(['dashboard']);
          }
        });
      });
  }
}
