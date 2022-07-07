import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { IDivision } from '../../core/intefaces/division.interface';
import { AddDivisionComponent } from './add-division/add-division.component';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss'],
})
export class DivisionsComponent implements OnInit {
  public createDivisionForm!: FormGroup;
  public id: number = 0;

  public columns = [
    {
      columnDef: 'Id',
      header: 'Id',
      cell: (division: IDivision) => `${division.id}`,
    },
    {
      columnDef: 'Description',
      header: 'Ciudad',
      cell: (division: IDivision) => `${division.description}`,
    },
  ];
  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: IDivision[] = [];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDivisions();
  }

  getDivisions(): void {
    this.tournamentService.getDivisions().subscribe((division) => {
      this.dataSource = division.data;
    });
  }

  addNewDivision(): void {
    const addDivisionRef = this.dialog.open(AddDivisionComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addDivisionRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDivisions();
      }
    });
  }
  redirectToDivision(city: IDivision): any {
    this.router.navigate(['/tournament/divisions/edit', city.id]);
  }

  // public createDivisionForm!: FormGroup;
  // public id: number = 0;

  // constructor(
  //   private _fb: FormBuilder,
  //   private readonly tournamentService: TournamentService
  // ) {
  //   this.tournamentService.getDivisions().subscribe((data) => {
  //     this.dataSource = data.data;
  //   });
  // }

  // ngOnInit(): void {
  //   this.createDivisionForm = this.createDivisionFormulary();
  // }

  // displayedColumns: string[] = ['id', 'division', 'actions'];
  // dataSource = [];

  // createDivisionFormulary(): FormGroup {
  //   return this._fb.group({
  //     description: ['', Validators.required],
  //   });
  // }

  // create() {
  //   if (this.id === 0) {
  //     this.tournamentService
  //       .createDivision(this.createDivisionForm.value)
  //       .subscribe(
  //         (data) => {
  //           this.cancel();
  //           alert('Division created successfully');
  //           this.tournamentService.getDivisions().subscribe((data) => {
  //             this.dataSource = data.data;
  //           });
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert('Error creating Division');
  //         }
  //       );
  //   } else {
  //     this.tournamentService
  //       .updateDivision(this.id, this.createDivisionForm.value)
  //       .subscribe(
  //         (data) => {
  //           this.cancel();
  //           alert('Division updated successfully');
  //           this.tournamentService.getDivisions().subscribe((data) => {
  //             this.dataSource = data.data;
  //           });
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert('Error updating Division');
  //         }
  //       );
  //   }
  // }

  // displayMenu() {
  //   document.getElementById('form')!.style.display = 'block';
  //   document.getElementById('addButton')!.style.display = 'none';
  //   this.createDivisionForm.reset();
  // }

  // cancel() {
  //   document.getElementById('form')!.style.display = 'none';
  //   document.getElementById('addButton')!.style.display = 'block';
  //   this.id = 0;
  // }

  // delete(id: number) {
  //   this.tournamentService.deleteDivision(id).subscribe((data) => {
  //     console.log(data);
  //     alert('Division deleted successfully');
  //     this.tournamentService.getDivisions().subscribe((data) => {
  //       this.dataSource = data.data;
  //     });
  //   });
  // }

  // handleUpdate(id: number, description: string) {
  //   document.getElementById('form')!.style.display = 'block';
  //   document.getElementById('addButton')!.style.display = 'none';
  //   this.id = id;
  //   this.createDivisionForm.setValue({ description });
  // }
}
