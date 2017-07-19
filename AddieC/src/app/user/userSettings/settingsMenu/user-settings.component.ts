import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
    privacySetting: string;
    checked = true;
    nickname = "Adds"; // This will be a value in the userDB, it's hardcoded temporarily
    privacyOptions = [
        'Public',
        'Friends Only',
        'Private',
    ];
    myBlockedUsers = [
        'Bubbles',
        'Flower',
    ]

    constructor(private router: Router) {}

    blockedUsers() {
        this.router.navigate(['/user/settings/blockedUsers']);
    }

    securityQuestion() {
        this.router.navigate(['/user/settings/securityQuestion']);
    }

    resetPassword() {
        this.router.navigate(['/user/settings/resetPassword']);
    }

    reportAbuse() {
        this.router.navigate(['/user/settings/reportAbuse']);
    }
}
