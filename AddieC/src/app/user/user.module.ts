import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
   MdButtonModule,
   MdCheckboxModule,
   MdMenuModule,
   MdToolbarModule,
   MdCardModule,
   MdInputModule,
   MdGridListModule,
   MdTabsModule,
   MdRadioModule
  } from '@angular/material';

import { UserNavComponent } from './userShared/userNavbar/user-navbar.component';
import { UserComponent } from './userComponent/user.component';
import { UserMenuComponent } from './userMenu/user-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { UserPostsComponent } from './userPosts/user-posts.component';
import { PostAddComponent } from './postAdd/post-add.component';
import { PostEditComponent } from './postEdit/post-edit.component';
import { UserSettingsComponent } from './userSettings/user-settings.component';

import { TruncatePipe } from './userShared/trunc.pipe';

import { UserService } from './userShared/user.service';
import { PostService } from './userShared/post.service';

const UserRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'settings', component: UserSettingsComponent, canActivate: [UserService] },
            { path: 'posts', component: UserPostsComponent, canActivate: [UserService] },
            { path: 'addPost', component: PostAddComponent, canActivate: [UserService] },
            { path: 'editPost/:id', component: PostEditComponent, canActivate: [UserService] },
            { path: '', component: UserMenuComponent, canActivate: [UserService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdMenuModule,
        MdToolbarModule,
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdInputModule,
        MdGridListModule,
        MdTabsModule,
        MdRadioModule,
        RouterModule.forChild(UserRoutes)
    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        UserNavComponent,
        UserComponent,
        UserMenuComponent,
        LoginComponent,
        SignUpComponent,
        UserPostsComponent,
        PostAddComponent,
        PostEditComponent,
        UserSettingsComponent,
        TruncatePipe
    ],
    providers: [
        UserService,
        PostService
    ]
})

export class UserModule {}
