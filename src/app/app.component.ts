import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommentsService } from './service/comments.service';
import { UsersService } from './service/users.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-test';

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
        // .map((items, name) => {
        //   return items;
        // })
        .value();
      console.log(commentGroup);
    });
  }
}
