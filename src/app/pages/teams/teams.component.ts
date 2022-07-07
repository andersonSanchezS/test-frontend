import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITeam } from '../../core/intefaces/team.interface';
import { TournamentService } from '../../services/tournament.service';
import { AddTeamComponent } from './add-team/add-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  public columns = [
    {
      columnDef: 'id',
      header: 'id',
      cell: (team: ITeam) => `${team.id}`,
    },
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (team: ITeam) => `${team.name}`,
    },
    {
      columnDef: 'players',
      header: '# jugadores',
      cell: (team: ITeam) => `${team.numberOfPlayers}`,
    },
    {
      columnDef: 'city',
      header: 'Ciudad',
      cell: (team: ITeam) => `${team.city_name}`,
    },
    {
      columnDef: 'division',
      header: 'Division',
      cell: (team: ITeam) => `${team.division_name}`,
    },
  ];
  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: ITeam[] = [];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.tournamentService.getTeams().subscribe((teams) => {
      this.dataSource = teams.data;
    });
  }

  addNewTeam(): void {
    const addTeamRef = this.dialog.open(AddTeamComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addTeamRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTeams();
      }
    });
  }
  redirectToDivision(team: ITeam): any {
    this.router.navigate(['/tournament/teams/edit', team.id]);
  }
}
