import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TournamentService } from 'src/app/services/tournament.service';
import { IMatch } from '../../../core/intefaces/match.interface';
import { ITeam } from '../../../core/intefaces/team.interface';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss'],
})
export class AddMatchComponent implements OnInit {
  public createMatchForm!: FormGroup;
  public teams: ITeam[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddMatchComponent>,
    private _fb: FormBuilder,
    private tournamentService: TournamentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createMatchForm = this.createMatchFormulary();
    this.getTeams();
  }

  createMatchFormulary(): FormGroup {
    return this._fb.group({
      team1_score: ['', Validators.required],
      team2_score: ['', Validators.required],
      team1: ['', Validators.required],
      team2: ['', Validators.required],
    });
  }

  get formValues() {
    return this.createMatchForm.value as IMatch;
  }

  getTeams() {
    this.tournamentService.getTeams().subscribe((response) => {
      this.teams = response.data;
    });
  }

  createMatch(): void {
    this.tournamentService.createMatch(this.formValues).subscribe(
      (response) => {
        this._snackBar.open('match created successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        this._snackBar.open('error creating match');
        console.log(error);
      }
    );
  }
}
