import { Component, OnInit } from '@angular/core';
import { UserService } from '../userShared/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
    theUser: string;
    navOpen: boolean = false;

    constructor(private userSVC: UserService, private router: Router) { }

    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.backgroundColor = "white";
    }
}