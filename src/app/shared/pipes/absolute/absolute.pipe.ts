import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolute'
})
export class AbsolutePipe implements PipeTransform {

  transform(value: number | null): string {
    if (value === null) {
      return "";
    }

    const val = Math.abs(value);

    if (value > 0) {
      return "+ " + val;
    } else if (value < 0) {
      return "- " + val;
    }

    return "" + val;
  }

}
