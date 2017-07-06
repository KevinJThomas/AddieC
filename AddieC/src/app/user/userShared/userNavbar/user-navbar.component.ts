import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-nav-bar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.css']
})

export class UserNavComponent {
    userLoggedIn = false;
    loggedIn: string;

    constructor(private userSVC: UserService, private router: Router) {
        this.userLoggedIn = userSVC.userLoggedIn;

        if (userSVC.userLoggedIn) {
            this.loggedIn = userSVC.loggedInUser;
        } else {
            this.loggedIn = 'Login';
        }
    }

    logout() {
        this.userSVC.logout();
        location.reload();
    }
}
