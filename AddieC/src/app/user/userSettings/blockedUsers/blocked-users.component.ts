import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../userShared/user.service';

import * as Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

@Component({
    templateUrl: './blocked-users.component.html',
    styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
    theUser: any;
    blockedUserList: string[] = [];
    blockedUsersEmpty = false;
    isDataAvailable = false;
    testing: any;

    constructor(private router: Router, private userSVC: UserService, private dialog: MdDialog) {}

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
            if (this.theUser.blockedUsers) {
                for (const uid of this.theUser.blockedUsers) {
                    dbRef.once('value')
                    .then((snapshot) => {
                        const tmp: string[] = snapshot.val();
                        console.log(Object.keys(tmp).map(key => tmp[key]));
                        this.blockedUserList.push(Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === uid)[0].email);
                    });
                }
                this.theUser.blockedUsers.reverse();
            } else {
                this.blockedUserList = ['None'];
                this.blockedUsersEmpty = true;
            }
        }).then(() =>
        this.isDataAvailable = true);
    }

    unblock(removeUser: string) {
        const verify = confirm(`Are you sure you want to unblock ` + removeUser + `?`);

        if (verify === true) {
            const userIndex = this.blockedUserList.indexOf(removeUser);
            console.log('removeUser: ' + removeUser);
            console.log('this.theUser.blockedUsers[userIndex]: ' + this.theUser.blockedUsers[userIndex]);
            this.userSVC.unblock(this.theUser, this.theUser.blockedUsers[userIndex]);
        }
    }

    add() {
        const dialogRef = this.dialog.open(BlockedUsersDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
        this.testing = result;
    });
    }

    back() {
        this.router.navigate(['/user/settings']);
    }
}

@Component({
    templateUrl: './blockedUsersDialog/blocked-users-dialog.component.html',
    styleUrls: ['./blockedUsersDialog/blocked-users-dialog.component.css']
})

export class BlockedUsersDialogComponent {
    constructor(private dialogRef: MdDialogRef<BlockedUsersDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {}
}
