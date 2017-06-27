import { Component } from '@angular/core';
import { UserService } from '../user/userShared/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    template: `
                <ul>
                    <li><a [routerLink]="['/']"><img src="http://placekitten.com/g/40/40" alt="CAT IMG"></a></li>
                    <li><a [routerLink]="['/about']">About</a></li>
                    <li style="float:right"><a [routerLink]="['/user']">{{loggedIn}}</a></li>
                    <li [hidden]="!userLoggedIn" style="float:right" class="pointer"><a (click)="logout()">Logout</a></li> 
                </ul>
    `,
    styleUrls: ['./navbar.component.css']
})

export class NavComponent {
    userLoggedIn: boolean = false;
    loggedIn: string;

    constructor(private userSVC: UserService, private router: Router) { 
        this.userLoggedIn = userSVC.userLoggedIn;

        if (userSVC.userLoggedIn) {
            this.loggedIn = userSVC.loggedInUser;
        } else {
            this.loggedIn = "Login";
        }
    }

    logout() {
        this.userSVC.logout();
        location.reload();
    }
}