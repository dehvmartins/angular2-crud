import {Component} from 'angular2/core';
import {ControlGroup,	FormBuilder, Validators} from	'angular2/common';
import {EmailValidator} from './emailValidator';
import {CanDeactivate} from 'angular2/router';

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html'
})

export class UserFormComponent implements CanDeactivate {
    userForm: ControlGroup;

    constructor(fb: FormBuilder){
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

}
