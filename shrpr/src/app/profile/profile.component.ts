import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../core/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: User;
	multi: boolean = false;
	show: string = '';

  constructor(
  	private auth: AuthService
  ) { }

  ngOnInit() { 
  	
  	//get user
  	this.auth.me().subscribe(user => {

  		//assign user
  		this.user = user;

  		console.log(this.user);

  		//check roles, decide which to show by default
  		if(this.user.roles.length == 1){

  			//single-user
  			this.multi = false;

  			//show first default
  			this.show = this.user.roles[0];
  		}
  		else if(this.user.roles.length > 1){

  			//multi-user
  			this.multi = true;

  			//show default: priority institution > instructor > student
  			if(this.user.roles.includes('institution')) {

  				this.show = 'institution';
  			}
  			else if(this.user.roles.includes('instructor')) {

  				this.show = 'instructor';
  			}
  			else {

  				this.show = 'student';
  			}
  		}
  	});
  }
}