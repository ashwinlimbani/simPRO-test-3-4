import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommentsService } from './service/comments.service';
import { UsersService } from './service/users.service';
import * as _ from 'lodash';
import { User } from './interface/user';
import { Comment } from './interface/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userMap = new Map<number, { user: User; comments: Array<Comment> }>();

  constructor(
    private userService: UsersService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.mapUsersAndComments();
  }

  mapUsersAndComments() {
    forkJoin([
      this.userService.getUsers(),
      this.commentsService.getComments(),
    ]).subscribe((res) => {
      const [users, comments] = res;

      const commentGroup = _(comments)
        .groupBy((item) => {
          return [item.user.id];
        })
        .value();
      users.forEach((user) => {
        this.userMap.set(user.id, {
          user: user,
          comments: commentGroup[user.id] ? commentGroup[user.id] : [],
        });
      });
    });
  }
}
