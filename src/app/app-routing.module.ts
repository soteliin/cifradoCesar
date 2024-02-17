import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CifradorComponent } from './cifrador/cifrador.component';
import { DescifradorComponent } from './descifrador/descifrador.component';

const routes: Routes = [
  {path:"cifrar",component:CifradorComponent},
  {path:"descifrar",component:DescifradorComponent},
  {path:"**", pathMatch:"full",redirectTo:"cifrar"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
