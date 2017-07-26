import { Component } from '@angular/core';
import { UserService } from '../userShared/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
    email: string;
    password: string;
    nickname: string;
    confirmPassword: string;
    passwordFail = false;

    constructor(private userSVC: UserService, private router: Router) { }

    signUp() {
        if (this.password !== this.confirmPassword) {
            this.passwordFail = true;
        } else {
            this.passwordFail = false;
            this.userSVC.register(this.email, this.password, this.nickname);
            this.userSVC.verifyUser();
        }
    }

    cancel() {
        this.router.navigate(['/user/login']);
    }
 }
