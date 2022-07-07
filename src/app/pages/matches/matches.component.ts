import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMatch } from '../../core/intefaces/match.interface';
import { TournamentService } from '../../services/tournament.service';
import { AddMatchComponent } from './add-match/add-match.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public matches: IMatch[] = [];
  public columns = [
    {
      columnDef: 'id',
      header: 'id',
      cell: (match: IMatch) => `${match.id}`,
    },
    {
      columnDef: 'team1_score',
      header: 'goles equipo 1',
      cell: (match: IMatch) => `${match.team1_score}`,
    },
    {
      columnDef: 'team2_score',
      header: 'goles equipo 2',
      cell: (match: IMatch) => `${match.team2_score}`,
    },
    {
      columnDef: 'team1',
      header: 'Local',
      cell: (match: IMatch) => `${match.team1_name}`,
    },
    {
      columnDef: 'team2',
      header: 'Visitante',
      cell: (match: IMatch) => `${match.team2_name}`,
    },
  ];
  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IMatch[] = [];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    this.tournamentService.getMatches().subscribe((matches) => {
      this.dataSource = matches.data;
      console.log(this.dataSource);
    });
  }

  addNewTeam(): void {
    const addMatchRef = this.dialog.open(AddMatchComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addMatchRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMatches();
      }
    });
  }
}
