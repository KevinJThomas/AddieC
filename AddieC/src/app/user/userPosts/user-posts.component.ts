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
    theUser: string;
    posts: Post[];

    constructor(
        private userSVC: UserService,
        private router: Router,
        private postSVC: PostService
    ) {}

    addPost() {
        this.router.navigate(['/user/addPost']);
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts() {
        const dbRef = firebase.database().ref('posts/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.posts = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid == this.userSVC.getUserId());
            console.log(this.userSVC.getUserId());
        });
    }

    editPost(thePost: Post) {
        // TODO: Edit Post Page
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
