import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-nav-bar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.css']
})

export class UserNavComponent {
    userLoggedIn = false;
    loggedInUser: string;
    search: string;

    constructor(private userSVC: UserService, private router: Router) {
        this.userLoggedIn = userSVC.userLoggedIn;

        if (userSVC.userLoggedIn) {
            this.loggedInUser = userSVC.loggedInUser;
        } else {
            this.loggedInUser = '404'; // Handle this
        }
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }
}
