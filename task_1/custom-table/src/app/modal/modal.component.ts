import {Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DOCUMENT} from "@angular/common";

// @ts-ignore
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input({required: true}) showModal!: boolean;
  @Output() showModalChange = new EventEmitter<boolean>();

  closeModal() {
    this.showModalChange.next(false);
  }

  stopPropagation(ev: Event) {
    ev.stopPropagation();
  }
}
