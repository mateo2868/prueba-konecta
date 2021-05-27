import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserComponent } from './form-user/form-user.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormUserComponent],
  exports: [FormUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class ComponentModule { }
