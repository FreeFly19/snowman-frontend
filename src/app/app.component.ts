import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
      
      <div *ngIf="friends.length === 0">Snowman Nata has no any friends!!!</div>
      
      <ul>
        <li *ngFor="let f of friends; let i = index" (click)="deleteFriend(i)">{{f}}</li>
      </ul>
      
      <button (click)="addNewFriend()">Add!!!</button>
    </h1>
  `
})
export class AppComponent {
  title = 'Hello, Nata!!!';
  friends = ['Anna', 'Elza', 'Sven'];

  addNewFriend() {
    this.friends.push('A new Friend');
  }

  deleteFriend(i) {
    this.friends.splice(i, 1);
  }
}
