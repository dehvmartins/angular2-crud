import {Component, OnInit} from 'angular2/core';
import {UsersService} from './users.service';
import {RouterLink} from 'angular2/router';

@Component({
    templateUrl: 'app/users.component.html',
    providers: [UsersService],
    directives: [RouterLink]
})

export class UsersComponent implements OnInit{
    users: any[];

    constructor(private _service: UsersService){
    }

    ngOnInit(){
      this._service.getUsers().subscribe(users => this.users = users);
    }

    deleteUser(user){
      if (confirm("Do you want to delete " + user.name + "?")) {
			var index = this.users.indexOf(user)
      this.users.splice(index, 1);

			this._service.deleteUser(user)
				.subscribe(null,
					err => {
            console.error('There was an error: ' + err);
						alert("Could not delete the user.");
						this.users.splice(index, 0, user);
					});
		  }
    }

}
