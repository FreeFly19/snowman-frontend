import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
      
      <div *ngIf="friends.length === 0">Snowman Nata has no any friends!!!</div>
      
      <ul>
        <li *ngFor="let f of friends; let i = index" (click)="deleteFriend(i)">{{f.name}}</li>
      </ul>
      
      <input type="text" [(ngModel)]="newFriendName">
      <button (click)="addNewFriend()">Add!!!</button>
      
      <div *ngIf="isSending">Sending...</div>
    </h1>
  `
})
export class AppComponent {
  title = 'Hello, Nata!!!';
  friends: Friend[] = [];
  newFriendName: string = '';
  isSending = false;

  constructor(private http: HttpClient) {
    http.get<Friend[]>('/api/friends')
      .subscribe(json => this.friends = json);
  }

  addNewFriend() {
    this.isSending = true;
    this.http.post<Friend>('/api/friends', {name: this.newFriendName})
      .subscribe(createdFriend => {
        this.friends.push(createdFriend);
        this.isSending = false;
      });

    this.newFriendName = '';
  }

  deleteFriend(i) {
    this.friends.splice(i, 1);
  }
}

interface Friend {
  id: number;
  name: string;
}
