import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../userShared/user.service';

import * as Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

@Component({
    templateUrl: './user-about.component.html',
    styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent {
    theUser: any;
    isDataAvailable = false;

    constructor(private router: Router, private userSVC: UserService) {}

    ngOnInit() {
        this.getUser();
    }

    // TODO: Move to service as observable
    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
        }).then(() =>
        this.isDataAvailable = true);
    }

    test() {
        console.log(this.theUser.age);
    }

    cancel() {
        this.router.navigate(['/user']);
    }

    apply() {
        this.userSVC.updateUserAbout(this.theUser);
        this.router.navigate(['/user']);
    }
}
