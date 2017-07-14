import { Injectable } from '@angular/core';
import { Post } from './post';
import * as firebase from 'firebase';

@Injectable()
export class PostService {

    createPost(post: Post) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
            .then((snapshot) => {
                const url = snapshot.metadata.downloadURLs[0];
                const dbRef = firebase.database().ref('posts/');
                const newPost = dbRef.push();
                newPost.set ({
                    title: post.title,
                    content: post.content,
                    uid: post.uid,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })
            .catch((error) => {
                console.log(`${error.message}`)
            });
    }

    editPost(update: Post) {
        const dbRef = firebase.database().ref('posts/').child(update.id)
            .update({
                title: update.title,
                content: update.content
            });
    }

    deletePost(deletePost: Post) {
        const dbRef = firebase.database().ref('posts/').child(deletePost.id).remove();

        const imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                }).catch(function(error) {
                    console.log(`${error.message}`);
                });
    }
}
