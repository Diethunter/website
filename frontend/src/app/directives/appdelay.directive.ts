import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appdelay]'
})
export class AppdelayDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.display = 'none';
    setTimeout(() => el.nativeElement.style.display = 'inherit', 20);
  }

}
