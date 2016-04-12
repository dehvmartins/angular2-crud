import {Component} from 'angular2/core';
import {ControlGroup,	FormBuilder, Validators} from	'angular2/common';
import {EmailValidator} from './emailValidator';
import {CanDeactivate, Router} from 'angular2/router';
import {UsersService} from './users.service';

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html',
    providers: [UsersService]
})

export class UserFormComponent implements CanDeactivate {
    userForm: ControlGroup;

    constructor(fb: FormBuilder, private _router: Router, private _userService: UsersService){
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
      this._userService.addUser(this.userForm.value).subscribe(x => {this._router.navigate(['Users'])});
    }

}
