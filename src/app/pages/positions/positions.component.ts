import { Component } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent {
  constructor(private readonly tournamentService: TournamentService) {
    this.tournamentService.getPositions().subscribe((data) => {
      this.dataSource = data.data;
    });
  }

  displayedColumns: string[] = [
    'name',
    'pj',
    'pg',
    'pe',
    'pp',
    'goals',
    'points',
  ];
  dataSource = [];
}
