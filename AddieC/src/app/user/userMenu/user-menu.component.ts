import { Component, OnInit } from '@angular/core';
import { UserService } from '../userShared/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
    theUser: string;
    navOpen = false;
    profilePicUrl = '../../assets/example_profile_picture.jpg';

    constructor(private userSVC: UserService, private router: Router) { }

    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
    }

    managePosts() {
        this.router.navigate(['/user/posts'])
    }

    settings() {
        this.router.navigate(['/user/settings'])
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    contacts() {
        this.router.navigate(['/user/contacts']);
    }
}
