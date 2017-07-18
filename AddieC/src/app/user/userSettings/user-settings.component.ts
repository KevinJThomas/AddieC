import { Component } from '@angular/core';

@Component({
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
    privacySetting: string;
    checked = true;

    privacyOptions = [
        'Public',
        'Friends Only',
        'Private',
    ];
}
