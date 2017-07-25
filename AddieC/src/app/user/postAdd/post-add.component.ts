import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../userShared/post.service';
import { UserService } from '../userShared/user.service';
import { Post } from '../userShared/post';
import * as firebase from 'firebase';

@Component({
    templateUrl: './post-add.component.html',
    styleUrls: ['./post-add.component.css']
})

export class PostAddComponent {
    imgTitle: string;
    imgSRC: string;
    title: string;
    description: string;
    post: Post;

    constructor(private postSVC: PostService, private userSVC: UserService, private router: Router) {}

    fileLoad($event: any) {
        const myReader: FileReader = new FileReader();
        const file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imgSRC = e.target.result;
        }
    }

    createPost() {
        this.post = new Post(
            this.title,
            this.description,
            this.userSVC.getUserId().toString(),
            this.imgTitle,
            this.imgSRC.substring(23)
        );
        this.postSVC.createPost(this.post);
        this.router.navigate(['/user']);
    }

    cancel() {
        this.router.navigate(['/user/posts']);
    }
}
