import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StockunitComponent } from './stockunit/stockunit.component';

export const routes: Routes = [
     {path:'',component:HomeComponent},
     {path:'stock/:id/:symbol',component:StockunitComponent}
];
