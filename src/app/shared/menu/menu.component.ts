import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() edit = new EventEmitter<unknown>();
  @Output() delete = new EventEmitter<unknown>();
  constructor(public dialog: MatDialog, private snackbar: SnackbarService) { }
  editButton() {
    this.edit.emit()
  }
  deleteButton() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        heading: "Delete Email",
        description: 'Are you sure Delete Email ?',
        firstButton: 'NO',
        secondButton: 'Delete'
      },
      width: '300px'
    }).afterClosed().subscribe((res) => { this.delete.emit(res), this.snackbar.showNotification('email Delete successful', 'X', 'success') })
  }
}
