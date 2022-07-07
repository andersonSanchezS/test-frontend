import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TournamentService } from 'src/app/services/tournament.service';
import { IDivision } from '../../../core/intefaces/division.interface';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss'],
})
export class AddDivisionComponent implements OnInit {
  public createDivisionForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddDivisionComponent>,
    private _fb: FormBuilder,
    private tournamentService: TournamentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createDivisionForm = this.createDivisionFormulary();
  }

  createDivisionFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
    });
  }

  get formValues() {
    return this.createDivisionForm.value as IDivision;
  }

  createDivision(): void {
    this.tournamentService.createDivision(this.formValues).subscribe(
      (response) => {
        this._snackBar.open('Division created successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
