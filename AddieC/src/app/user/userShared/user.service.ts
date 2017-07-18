import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable() // Used for DI
export class UserService implements CanActivate {
    userLoggedIn = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {
        firebase.initializeApp({
            apiKey: 'AIzaSyBnYaUlBo8GEWfw9Z_nBohqcGk-z3fEn-o',
            authDomain: 'addiec-1026c.firebaseapp.com',
            databaseURL: 'https://addiec-1026c.firebaseio.com',
            projectId: 'addiec-1026c',
            storageBucket: 'addiec-1026c.appspot.com',
            messagingSenderId: '809044298440'
        })
     }

    getUserId(): Observable<string[]> {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            return this.authUser.uid;
        } else {
            return Array['Unknown User']; // TODO: What to do when this happens?
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

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please try again!`); // using alerts for testing, change to something else later
        });
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
}
