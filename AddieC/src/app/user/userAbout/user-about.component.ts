import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { UserService } from '../userShared/user.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

@Component({
    templateUrl: './user-about.component.html',
    styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent {
    theUser: any;
    isDataAvailable = false;
    stateCtrl: FormControl;
    filteredStates: any;
    states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
    ];

    constructor(private router: Router, private userSVC: UserService) {
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));
    }

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

    filterStates(val: string) {
        return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
                : this.states;
    }

    cancel() {
        this.router.navigate(['/user']);
    }

    apply() {
        this.userSVC.updateUserAbout(this.theUser);
        this.router.navigate(['/user']);
    }
}
