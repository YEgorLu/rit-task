import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {OutputService} from "./output.service";
import {Subscription} from "rxjs";

@Directive({
  selector: '[tableOutput]'
})
export class OutputDirective implements OnInit, OnDestroy{
  @HostListener('mouseover') clearOutput() {
    this.outputService.clear();
  }

  outputSub!: Subscription;
  ngOnDestroy(): void {
    this.outputSub.unsubscribe();
  }

  ngOnInit(): void {
    this.outputSub = this.outputService.getValue().subscribe((val) => {
      this.el.nativeElement.textContent = val;
    });
  }

  constructor(
    private el: ElementRef,
    private outputService: OutputService) { }
}

