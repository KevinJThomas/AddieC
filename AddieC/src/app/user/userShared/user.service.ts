import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable() // Used for DI
export class UserService implements CanActivate {
    userLoggedIn = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {}

    getUserId(): Observable<string[]> {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            return this.authUser.uid;
        } else {
            return Array['Unknown User']; // TODO: Handle this case
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true }

        this.router.navigate(['/user/login']);
        return false;
    }

    register(email: string, password: string, username: string) { // TODO: using an observable may fix login button issue
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please try again!`); // using alerts for testing, change to something else later
        });

        const dbRef = firebase.database().ref('users/');
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            const newUser = dbRef.push();
            newUser.set ({
                id: newUser.key,
                email: this.authUser.email,
                uid: this.authUser.uid,
                nickname: username,
                emailNotifications: true,
                securityQuestionIndex: -1,
                securityQuestionAnswer: '',
                receiveNewsletters: false,
                loginAlerts: false,
                privacy: 'Friends Only',
                receiveFriendRequests: true,
                profilePicture: 'https://firebasestorage.googleapis.com/v0/b/addiec-1026c.appspot.com/o/profilePictures%2Fdefault_profile_picture.jpg?alt=media&token=38b1f86b-94bd-4b83-935e-5663b33f6982',
                aboutMe: ''
            });
        }
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/user']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(`${error.message} Unable to login. Please try again!`) // using alerts for testing, change to something else later
        });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function () {

        }, function(error) {
            alert(`${error.message} Unable to logout. Please try again!`) // using alerts for testing, change to something else later
        });
    }

    unblock(currentUser: any, userIndex: string) {
        const dbRef = firebase.database().ref('users/').child(currentUser.id).child('blockedUsers');
        dbRef.orderByValue().equalTo(userIndex).on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
    }

    passwordResetEmail() {
        firebase.auth().sendPasswordResetEmail(this.loggedInUser);
    }

    // Implement button to click when looking at someone else's profile page. This method is untested, but it should be pretty close
    //
    // block(currentUser: any, userToBlock: string) {
    //     const dbRef = firebase.database().ref('users/').child(currentUser.id).child('blockedUsers/');
    //     const blockedUser = dbRef.push();
    //             blockedUser.set ({
    //                 value: userToBlock
    //             }).catch((error) => {
    //                 console.log(error.message);
    //             });
    // }

    updateSecurityQuestion(user: any, index: number, answer: string) {
        firebase.database().ref('users/').child(user.id)
            .update({
                securityQuestionIndex: index,
                securityQuestionAnswer: answer
            });

    }

    updateProfilePicture(user: any, pictureUrl: string) {
        firebase.database().ref('users/').child(user.id)
            .update({
                profilePicture: pictureUrl
            });
    }

    updateUserSettings(user: any) {
        firebase.database().ref('users/').child(user.id)
            .update({
                nickname: user.nickname,
                emailNotifications: user.emailNotifications,
                receiveNewsletters: user.receiveNewsletters,
                loginAlerts: user.loginAlerts,
                privacy: user.privacy,
                receiveFriendRequests: user.receiveFriendRequests
            });
    }

    updateUserAbout(user: any) {
        firebase.database().ref('users/').child(user.id)
            .update({
                nickname: user.nickname,
                aboutMe: user.aboutMe,
                age: user.age
            });
    }

    removeContact(currentUser: any, userIndex: string) {
        const dbRef = firebase.database().ref('users/').child(currentUser.id).child('contacts');
        dbRef.orderByValue().equalTo(userIndex).on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
    }
}
