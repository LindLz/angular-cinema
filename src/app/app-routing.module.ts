import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AllMoviesComponent } from './views/movies/components/all-movies/all-movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
    {path: 'views', loadChildren: () =>import ('./views/views.module').then(m => m.ViewsModule)},
    { path: 'movies/all-movies', component: AllMoviesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
