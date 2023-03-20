import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject: BehaviorSubject<Array<User>> = new BehaviorSubject<
    Array<User>
  >([]);
  users$ = this.usersSubject.asObservable().pipe(
    filter((users) => !!users.length),
    map((users) => {
      return [...users];
    })
  );

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    return this.http
      .get<{
        limit: number;
        skip: number;
        total: number;
        users: User[];
      }>(`https://dummyjson.com/users`)
      .pipe(map((response) => response.users))
      .subscribe((users) => {
        this.usersSubject.next(users);
      });
  }

  getUsers(): Observable<User[]> {
    return this.users$.pipe(take(1));
  }
}
