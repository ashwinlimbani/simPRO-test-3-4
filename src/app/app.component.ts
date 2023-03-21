import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin, delay } from 'rxjs';
import { CommentsService } from './service/comments.service';
import { UsersService } from './service/users.service';
import * as _ from 'lodash';
import { User } from './interface/user';
import { Comment } from './interface/comment';
import { LoadingSpinnerService } from './shared/loading-spinner/loading-spinner.service';

interface UserCommentMap {
  user: User;
  comments: Array<Comment>;
  children?: UserCommentMap[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userMap = new Map<number, UserCommentMap>();
  constructor(
    private userService: UsersService,
    private commentsService: CommentsService,
    private spinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.mapUsersAndComments();
  }

  mapUsersAndComments() {
    this.spinnerService.showSpinner();
    forkJoin([this.userService.getUsers(), this.commentsService.getComments()])
      .pipe(finalize(() => this.spinnerService.closeSpinner()))
      .subscribe((res) => {
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
        // console.log(Array.from(this.userMap.values()));
        // console.log(commentGroup);
      });
  }
}
