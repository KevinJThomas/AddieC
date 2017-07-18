import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../user/userShared/user.service';
import { Post } from '../user/userShared/post';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    addieUrl = '../assets/addie.jpg';
    posts: Post[];

    constructor(private router: Router, private userSVC: UserService) {}

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        const dbRef = firebase.database().ref('/posts');
        dbRef.once('value')
            .then((snapshot) => {
                const tmp: string[] = snapshot.val();
                this.posts = Object.keys(tmp).map(key => tmp[key]);
            });
    }

    choosePost(post: Post) {
        this.router.navigate(['/post', post.id]);
    }
}
