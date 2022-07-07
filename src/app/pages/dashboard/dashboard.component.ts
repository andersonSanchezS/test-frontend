import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public username: string = '';

  // Pages of the app
  public pages: Array<{ title: string; link: string }> = [
    { title: 'cities', link: '/tournament/cities' },
    { title: 'divisions', link: '/tournament/divisions' },
    { title: 'matches', link: '/tournament/matches' },
    { title: 'players', link: '/tournament/players' },
    { title: 'teams', link: '/tournament/teams' },
    { title: 'positions', link: '/tournament/positions' },
  ];

  constructor(private router: Router) {}
}
