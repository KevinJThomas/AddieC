import { Component } from '@angular/core';
import { UserService } from '../user/userShared/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavComponent {
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
        location.reload();
    }
}
