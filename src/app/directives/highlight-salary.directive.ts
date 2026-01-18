import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector:  '[appHighlightSalary]',
  standalone: true
})
export class HighlightSalaryDirective implements OnInit {
  @Input() appHighlightSalary: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightSalary > 100000) {
      this.el.nativeElement.style.backgroundColor = '#c8e6c9';
      this.el.nativeElement. style.fontWeight = 'bold';
      this.el.nativeElement. style.color = '#1b5e20';
    } else if (this.appHighlightSalary > 50000) {
      this.el.nativeElement.style.backgroundColor = '#fff9c4';
      this.el.nativeElement.style.fontWeight = '500';
    }
  }
}
