import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TournamentService } from '../../../services/tournament.service';
import { ITeam } from '../../../core/intefaces/team.interface';
import { ICity } from '../../../core/intefaces/city.interface';
import { IDivision } from '../../../core/intefaces/division.interface';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  public createTeamForm!: FormGroup;
  public cities: ICity[] = [];
  public divisions: IDivision[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddTeamComponent>,
    private _fb: FormBuilder,
    private tournamentService: TournamentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createTeamForm = this.createTeamFormulary();
    this.getCities();
    this.getDivisions();
  }

  createTeamFormulary(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      numberOfPlayers: ['', Validators.required],
      city: ['', Validators.required],
      division: ['', Validators.required],
    });
  }

  get formValues() {
    return this.createTeamForm.value as ITeam;
  }

  getCities() {
    this.tournamentService.getCities().subscribe((cities) => {
      this.cities = cities.data;
    });
  }

  getDivisions() {
    this.tournamentService.getDivisions().subscribe((divisions) => {
      this.divisions = divisions.data;
    });
  }

  createTeam(): void {
    this.tournamentService.createTeam(this.formValues).subscribe(
      (response) => {
        this._snackBar.open('Team created successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        this._snackBar.open('error creating team');
      }
    );
  }
}
