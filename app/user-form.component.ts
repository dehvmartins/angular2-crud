import {Component} from 'angular2/core';
import {ControlGroup,	FormBuilder} from	'angular2/common';

@Component({
    templateUrl: 'app/user-form.component.html',
})

export class UserFormComponent{
    userForm: ControlGroup;

    constructor(fb: FormBuilder){
      this.userForm = fb.group({
          name: [],
          email: [],
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
