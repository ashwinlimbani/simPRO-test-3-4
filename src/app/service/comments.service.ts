import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { Comment } from '../interface/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private commentsSubject: BehaviorSubject<Array<Comment>> =
    new BehaviorSubject<Array<Comment>>([]);
  comments$ = this.commentsSubject.asObservable().pipe(
    filter((comments) => !!comments.length),
    map((comments) => {
      return [...comments];
    })
  );

  constructor(private http: HttpClient) {
    this.loadComments();
  }

  loadComments() {
    return this.http
      .get<{
        limit: number;
        skip: number;
        total: number;
        comments: Comment[];
      }>(`https://dummyjson.com/comments`)
      .pipe(map((response) => response.comments))
      .subscribe((comments) => {
        this.commentsSubject.next(comments);
      });
  }

  getComments(): Observable<Comment[]> {
    return this.comments$.pipe(take(1));
  }
}
