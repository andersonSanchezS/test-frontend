import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { EditDivisionComponent } from './divisions/edit-division/edit-division.component';
import { MatchesComponent } from './matches/matches.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { PlayersComponent } from './players/players.component';
import { PositionsComponent } from './positions/positions.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'cities',
        component: CitiesComponent,
      },
      {
        path: 'cities/edit/:id',
        component: EditCityComponent,
      },
      {
        path: 'divisions',
        component: DivisionsComponent,
      },
      {
        path: 'divisions/edit/:id',
        component: EditDivisionComponent,
      },
      {
        path: 'players',
        component: PlayersComponent,
      },
      {
        path: 'players/edit/:id',
        component: EditPlayerComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'teams/edit/:id',
        component: EditTeamComponent,
      },
      {
        path: 'matches',
        component: MatchesComponent,
      },
      {
        path: 'positions',
        component: PositionsComponent,
      },
      {
        path: '**',
        redirectTo: 'positions',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
