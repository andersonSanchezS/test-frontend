import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IDivision } from 'src/app/core/intefaces/division.interface';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-edit-division',
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.scss'],
})
export class EditDivisionComponent implements OnInit {
  public updateDivisionForm!: FormGroup;
  public idDivision!: number;
  public divisionName: string = '';

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idDivision = id));
  }

  ngOnInit(): void {
    this.updateDivisionForm = this.createDivisionFormulary();

    this.tournamentService
      .getDivisionById(this.idDivision)
      .subscribe((division) => {
        const { description } = division.data;

        // This to exclude the necessary properties from the response

        this.updateDivisionForm.setValue({ description });
        this.divisionName = description;
      });
  }

  createDivisionFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
    });
  }
  get formValues(): IDivision {
    return this.updateDivisionForm.value;
  }

  updateDivision(): void {
    this.tournamentService
      .updateDivision(this.idDivision, this.updateDivisionForm.value)
      .subscribe(
        (data) => {
          this._snackBar.open('Division updated successfully');
          this.router.navigate(['/tournament/divisions']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Error updating city');
        }
      );
  }

  deleteDivision(): void {
    this.tournamentService.deleteDivision(this.idDivision).subscribe(() => {
      this._snackBar.open('Division deleted successfully');
      this.router.navigate(['/tournament/divisions']);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
