import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './email-form/email-form.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailFormComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule

  ],
  exports: [MenuComponent, EmailFormComponent]
})
export class SharedModule { }
