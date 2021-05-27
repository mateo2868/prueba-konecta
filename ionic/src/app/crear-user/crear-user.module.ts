import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearUserPageRoutingModule } from './crear-user-routing.module';

import { CrearUserPage } from './crear-user.page';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentModule,
    CrearUserPageRoutingModule
  ],
  declarations: [CrearUserPage]
})
export class CrearUserPageModule {}
