import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanetPageComponent} from "./planet-page/planet-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  {path: 'planets', component: MainPageComponent},
  {path: 'planets/:id', component: PlanetPageComponent},
  {path: '', redirectTo: 'planets', pathMatch: 'full'},
  {path: '**', redirectTo: 'planets', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
