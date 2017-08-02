import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { UserService } from '../userShared/user.service';
import { PostService } from '../userShared/post.service';
import { Post } from '../userShared/post';

import * as firebase from 'firebase';

@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
    theUser: any;
    userNickname: string;
    navOpen = false;
    profilePicUrl: string;
    posts: Post[];
    testing: any;
    isDataAvailable = false;

    constructor(private userSVC: UserService, private router: Router, private dialog: MdDialog, private postSVC: PostService) { }

    ngOnInit() {
        this.getPosts();
    }

    viewPosts() {
        this.router.navigate(['/user/posts'])
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    choosePost(post: Post) {
        this.router.navigate(['/post', post.id, 'Profile']);
    }

    contacts() {
        const dialogRef = this.dialog.open(ContactsDialogComponent);
    }

    viewSummary() {
        const dialogRef = this.dialog.open(DescriptionDialogComponent);
    }

    editProfilePicture() {
        const dialogRef = this.dialog.open(ProfilePictureDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.isDataAvailable = false;
            const userDbRef = firebase.database().ref('users/');
            userDbRef.once('value')
            .then((snapshot) => {
                const tmp: string[] = snapshot.val();
                this.profilePicUrl = Object.keys(tmp)
                    .map(key => tmp[key])
                    .filter(item => item.uid === this.userSVC.getUserId())[0]
                    .profilePicture;
            }).then(() =>
            this.isDataAvailable = true);
        });
    }

    about() {
        this.router.navigate(['/user/about']);
    }

    addPost() {
        this.router.navigate(['/user/addPost']);
    }

    getPosts() {
        const dbRef = firebase.database().ref('posts/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.posts = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId());
        });

        const userDbRef = firebase.database().ref('users/');
        userDbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.userNickname = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0].nickname;
            this.theUser = Object.keys(tmp)
                .map(key => tmp[key])
                .filter(item => item.uid === this.userSVC.getUserId())[0];
            this.profilePicUrl = Object.keys(tmp)
                .map(key => tmp[key])
                .filter(item => item.uid === this.userSVC.getUserId())[0]
                .profilePicture;
        }).then(() =>
        this.isDataAvailable = true);
    }

    deletePost(single: Post) {
        const verify = confirm(`Are you sure you want to delete this post?`)
        if (verify === true) {
            this.postSVC.deletePost(single);
            this.router.navigate(['/user']);
        } else {
            alert('Nothing deleted!');
        }
    }
}

@Component({
    templateUrl: './contactsDialog/contacts-dialog.component.html',
    styleUrls: ['./contactsDialog/contacts-dialog.component.css']
})
export class ContactsDialogComponent implements OnInit {
    theUser: any;
    contactsList: string[] = [];
    contactsEmpty = false;
    isDataAvailable = false;

    constructor(
        private dialogRef: MdDialogRef<ContactsDialogComponent>,
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
                for (const uid of this.theUser.contacts) {
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
            const userIndex = this.contactsList.indexOf(user);
            this.userSVC.removeContact(this.theUser, this.theUser.contacts[userIndex]);
        }
    }
}

@Component({
    templateUrl: './profilePictureDialog/profile-picture-dialog.component.html',
    styleUrls: ['./profilePictureDialog/profile-picture-dialog.component.css']
})
export class ProfilePictureDialogComponent implements OnInit {
    theUser: any;
    profilePicture: string;
    originalProfilePicture: string;
    isDataAvailable = false;
    pictureChanged = false;

    constructor(
        private dialogRef: MdDialogRef<ProfilePictureDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private userSVC: UserService,
        private router: Router) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
            this.profilePicture = this.theUser.profilePicture;
            this.originalProfilePicture = this.theUser.profilePicture;
        }).then(() =>
        this.isDataAvailable = true);
    }

    fileLoad($event: any) {
        const myReader: FileReader = new FileReader();
        const file: File = $event.target.files[0];
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.profilePicture = e.target.result;
        }

        this.pictureChanged = true;
    }

    updatePicture() {
        this.userSVC.updateProfilePicture(this.theUser, this.profilePicture);
    }
}

@Component({
    templateUrl: './descriptionDialog/description-dialog.component.html',
    styleUrls: ['./descriptionDialog/description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {
    theUser: any;
    isDataAvailable = false;

    constructor(
        private dialogRef: MdDialogRef<DescriptionDialogComponent>,
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
        }).then(() =>
        this.isDataAvailable = true);
    }
}
