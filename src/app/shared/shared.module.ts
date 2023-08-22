import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './email-form/email-form.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



@NgModule({
  declarations: [
    EmailFormComponent,
    MenuComponent,
    EditEmailComponent,
    DialogBoxComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule

  ],
  exports: [MenuComponent, EmailFormComponent, EditEmailComponent, MaterialModule]
})
export class SharedModule { }
