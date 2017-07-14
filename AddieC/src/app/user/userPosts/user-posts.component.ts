import { Component, OnInit } from '@angular/core';
import { UserService } from '../userShared/user.service';
import { Router } from '@angular/router';
import { PostService } from '../userShared/post.service';
import { Post } from '../userShared/post';
import * as firebase from 'firebase';

@Component({
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})

export class UserPostsComponent implements OnInit {

    constructor(
        private userSVC: UserService,
        private router: Router,
        private postSVC: PostService
    ) {}
    
    addPost() {
        this.router.navigate(['/user/addPost']);
    }

    ngOnInit() {

    }
}