import { Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;
  users: any[] = [];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAll()
      .pipe(
        tap(resp => {
          this.users = resp.users;
        })
      ).subscribe();
  }

  onUserSaved(event) {
    this.userService.getAll()
      .pipe(
        tap(resp => {
          this.users = resp.users;
        })
      ).subscribe();
  }

  changeStatus(user) {
    let status = 'false';
    if (user.active === true) {
      status = 'false';
    } else {
      status = 'true';
    }

    this.userService.changeStatus(user._id, status)
      .subscribe(userSaved => {
        this.toastrService.success(userSaved.message, '¡Éxito!');

        this.userService.getAll()
          .pipe(
            tap(resp => {
              this.users = resp.users;
            })
          ).subscribe();
      });
  }
}
