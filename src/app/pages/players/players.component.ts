import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPlayer } from '../../core/intefaces/player.interface';
import { TournamentService } from '../../services/tournament.service';
import { AddPlayerComponent } from './add-player/add-player.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  public players: IPlayer[] = [];
  public columns = [
    {
      columnDef: 'id',
      header: 'id',
      cell: (player: IPlayer) => `${player.id}`,
    },
    {
      columnDef: 'name',
      header: 'nombre',
      cell: (player: IPlayer) => `${player.name}`,
    },
    {
      columnDef: 'age',
      header: 'edad',
      cell: (player: IPlayer) => `${player.age}`,
    },
    {
      columnDef: 'salary',
      header: 'salario',
      cell: (player: IPlayer) => `${player.salary}`,
    },
    {
      columnDef: 'yellow_cards',
      header: 'tarjetas amarillas',
      cell: (player: IPlayer) => `${player.yellow_cards}`,
    },
    {
      columnDef: 'red_cards',
      header: 'tarjetas rojas',
      cell: (player: IPlayer) => `${player.red_cards}`,
    },
    {
      columnDef: 'goals',
      header: 'goles',
      cell: (player: IPlayer) => `${player.goals}`,
    },
    {
      columnDef: 'played_matches',
      header: 'partidos jugados',
      cell: (player: IPlayer) => `${player.played_matches}`,
    },
    {
      columnDef: 'team',
      header: 'equipo',
      cell: (player: IPlayer) => `${player.team_name}`,
    },
  ];
  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IPlayer[] = [];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.tournamentService.getPlayers().subscribe((players) => {
      this.dataSource = players.data;
    });
  }

  addNewPlayer(): void {
    const addPlayerRef = this.dialog.open(AddPlayerComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addPlayerRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPlayers();
      }
    });
  }

  redirectToPlayer(player: IPlayer): any {
    this.router.navigate(['/tournament/players/edit', player.id]);
  }
}
