import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPixel'
})
export class ToPixelPipe implements PipeTransform {

  transform(value: number, multiplier: number = 1): string {
    return (value * multiplier).toString() + 'px';
  }

}
