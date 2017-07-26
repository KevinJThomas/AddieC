import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../userShared/user.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import * as firebase from 'firebase';

@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
    theUser: string;
    navOpen = false;
    profilePicUrl = '../../assets/example_profile_picture.jpg';
    testing: any;

    constructor(private userSVC: UserService, private router: Router, private dialog: MdDialog) { }

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
        const dialogRef = this.dialog.open(ContactsComponentDialog);
        dialogRef.afterClosed().subscribe(result => {
            this.testing = result;
        });
    }

    about() {
        this.router.navigate(['/user/about']);
    }
}

@Component({
    templateUrl: './contactsDialog/contacts-dialog.component.html',
    styleUrls: ['./contactsDialog/contacts-dialog.component.css']
})
export class ContactsComponentDialog implements OnInit {
    theUser: any;
    contactsList: string[] = [];
    contactsEmpty = false;
    isDataAvailable = false;

    constructor(
        private dialogRef: MdDialogRef<ContactsComponentDialog>, 
        @Inject(MD_DIALOG_DATA) public data: any,
        private userSVC: UserService) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
            if (this.theUser.contacts) {
                for (let uid of this.theUser.contacts) {
                    dbRef.once('value')
                    .then((snapshot) => {
                        const tmp: string[] = snapshot.val();
                        this.contactsList.push(Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === uid)[0].nickname);
                    });
                }
                this.theUser.contacts.reverse();
                
            } else {
                this.contactsList = ['None'];
                this.contactsEmpty = true;
            }            
        }).then(() =>
        this.isDataAvailable = true);
    }

    remove(user: any) {
        const verify = confirm(`Are you sure you want to remove ` + user + ` from your contacts?`);

        if (verify === true) {
            let userIndex = this.contactsList.indexOf(user);
            this.userSVC.removeContact(this.theUser, this.theUser.contacts[userIndex]);
        }
    }
}
