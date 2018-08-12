import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "about", loadChildren: './about/about.module#AboutPageModule' },
  { path: "home", loadChildren: './home/home.module#HomePageModule' },
  { path: "device-list", loadChildren: './device-list/device-list.module#DeviceListPageModule' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'device-list', loadChildren: './device-list/device-list.module#DeviceListPageModule' }
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
