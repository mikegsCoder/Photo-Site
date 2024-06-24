import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
})
export class ShortenTextPipe implements PipeTransform {
  textLength = 25;

  transform(value: string): string {
    return value?.length > this.textLength
      ? `${value.substr(0, this.textLength)}...`
      : value;
  }
}
