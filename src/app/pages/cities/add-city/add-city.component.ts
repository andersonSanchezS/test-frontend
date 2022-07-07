import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TournamentService } from '../../../services/tournament.service';
import { ICity } from '../../../core/intefaces/city.interface';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  public createCityForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddCityComponent>,
    private _fb: FormBuilder,
    private tournamentService: TournamentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createCityForm = this.createCityFormulary();
  }

  createCityFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
    });
  }

  get formValues() {
    return this.createCityForm.value as ICity;
  }

  createCity(): void {
    this.tournamentService.createCity(this.formValues).subscribe(
      (response) => {
        this._snackBar.open('City created successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
