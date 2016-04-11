import {Component} from 'angular2/core';
import {ControlGroup,	FormBuilder, Validators} from	'angular2/common';
import {EmailValidator} from './emailValidator';

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html'
})

export class UserFormComponent{
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

}
