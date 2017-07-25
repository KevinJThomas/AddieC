import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../userShared/user.service';

import * as firebase from 'firebase';

@Component({
    templateUrl: './security-question.component.html',
    styleUrls: ['./security-question.component.css']
})
export class SecurityQuestionComponent implements OnInit {
    questions = [
        {value: -1, question: '-'},
        {value: 0, question: 'Who was your childhood best friend?'},
        {value: 1, question: 'What was the name of your first pet?'},
        {value: 2, question: 'Who was your first roommate?'},
        {value: 3, question: 'Who was your first boss?'},
        {value: 4, question: 'What is your mother\'s maiden name?'},
        {value: 5, question: 'What street did you grow up on?'}
    ]
    answer: string;
    index: number;
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
            this.answer = this.theUser.securityQuestionAnswer;
            this.index = this.theUser.securityQuestionIndex;
        }).then(() =>
        this.isDataAvailable = true);
    }

    apply() {
        this.userSVC.updateSecurityQuestion(this.theUser, this.index, this.answer);
        this.router.navigate(['/user/settings']);
    }

    cancel() {
        this.router.navigate(['/user/settings']);
    }
}
