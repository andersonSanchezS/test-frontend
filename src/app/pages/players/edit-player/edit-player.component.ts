import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { IPlayer } from '../../../core/intefaces/player.interface';
import { ITeam } from '../../../core/intefaces/team.interface';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent implements OnInit {
  public updatePlayerForm!: FormGroup;
  public idPlayer!: number;
  public playerName: string = '';
  public teams: ITeam[] = [];

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idPlayer = id));
  }

  ngOnInit(): void {
    this.updatePlayerForm = this.createPlayerFormulary();

    this.tournamentService.getPlayerById(this.idPlayer).subscribe((player) => {
      const {
        name,
        age,
        salary,
        yellow_cards,
        red_cards,
        goals,
        played_matches,
        team,
      } = player.data[0];

      // This to exclude the necessary properties from the response

      this.updatePlayerForm.setValue({
        name,
        age,
        salary,
        yellow_cards,
        red_cards,
        goals,
        played_matches,
        team,
      });
      this.playerName = name;
    });

    this.getTeams();
  }

  createPlayerFormulary(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required],
      yellow_cards: ['', Validators.required],
      red_cards: ['', Validators.required],
      played_matches: ['', Validators.required],
      goals: ['', Validators.required],
      team: ['', Validators.required],
    });
  }

  get formValues(): IPlayer {
    return this.updatePlayerForm.value;
  }

  updatePlayer(): void {
    this.tournamentService
      .updatePlayer(this.idPlayer, this.updatePlayerForm.value)
      .subscribe(
        (data) => {
          this._snackBar.open('Division updated successfully');
          this.router.navigate(['/tournament/players']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Error updating player');
        }
      );
  }

  deletePlayer(): void {
    this.tournamentService.deletePlayer(this.idPlayer).subscribe(() => {
      this._snackBar.open('player deleted successfully');
      this.router.navigate(['/tournament/players']);
    });
  }

  getTeams() {
    this.tournamentService.getTeams().subscribe((response) => {
      this.teams = response.data;
    });
  }

  onBack(): void {
    this.location.back();
  }
}
