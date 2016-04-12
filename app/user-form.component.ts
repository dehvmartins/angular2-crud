import {Component, OnInit} from 'angular2/core';
import {ControlGroup,	FormBuilder, Validators} from	'angular2/common';
import {EmailValidator} from './emailValidator';
import {CanDeactivate, Router, RouteParams} from 'angular2/router';
import {UsersService} from './users.service';

import {User} from './user';

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html',
    providers: [UsersService]
})

export class UserFormComponent implements OnInit, CanDeactivate {
    userForm: ControlGroup;
    title: string;
    user = new User();

    constructor(fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _userService: UsersService){
      this.userForm = fb.group({
          name: ['', Validators.required],
          email: ['', EmailValidator.valid],
          phone: [],
          address: fb.group({
            street: [],
            suite: [],
            city: [],
            zipcode: []
          })
      });
    }

    routerCanDeactivate(next, previous){
        return confirm("Are you sure?");
    }

    save(){
      var action;

      if(this.user.id)
        action = this._userService.updateUser(this.user);
      else
        action = this._userService.addUser(this.user);

      action.subscribe(x => {this._router.navigate(['Users'])});
    }

    ngOnInit(){
      var id = this._routeParams.get("id");

      this.title = id ? "Edit User" : "New User";

      if(!id)
          return;

      this._userService.getUser(id).
                        subscribe(user => this.user = user,
                                  response => {
                                      if(response.status == 404){
                                        console.log('NotFound');
                                        this._router.navigate(['NotFound']);
                                      }
                                  });
    }

}
