import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITeam } from '../../../core/intefaces/team.interface';
import { TournamentService } from '../../../services/tournament.service';
import { IPlayer } from '../../../core/intefaces/player.interface';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
  public createPlayerForm!: FormGroup;
  public teams: ITeam[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddPlayerComponent>,
    private _fb: FormBuilder,
    private tournamentService: TournamentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createPlayerForm = this.createPlayerFormulary();
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

  get formValues() {
    return this.createPlayerForm.value as IPlayer;
  }

  getTeams() {
    this.tournamentService.getTeams().subscribe((response) => {
      this.teams = response.data;
    });
  }

  createPlayer(): void {
    this.tournamentService.createPlayer(this.formValues).subscribe(
      (response) => {
        this._snackBar.open('player created successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        this._snackBar.open('error creating player');
        console.log(error);
      }
    );
  }
}
