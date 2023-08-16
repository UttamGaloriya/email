import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() edit = new EventEmitter<unknown>();
  @Output() delete = new EventEmitter<unknown>();


  editButton() {
    this.edit.emit()
  }
  deleteButton() {
    this.delete.emit()
  }
}
