import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { UserRoleService } from '../../services/userRole.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm =  new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor( 
    private loginService: LoginService,
    private userRoleService: UserRoleService,
    private router: Router,
    private toastrService: ToastrService
   ) {}

  login() {
    if (this.loginForm.valid) {
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
        },
        err => {
          this.toastrService.warning(err.error.message, null, { positionClass: 'toast-top-center' });
        });
    } else {
      this.toastrService.warning('El email y/o la contraseña son requeridos', null, { positionClass: 'toast-top-center'});
    }
  }
}
