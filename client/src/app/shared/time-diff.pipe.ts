import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  transform(value: string): unknown {
    let result = '';

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerMonth * 365;

    const valueDate = new Date(value);
    const current = new Date();
    const elapsed = +current - +valueDate;

    const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' });

    if (elapsed < msPerMinute) {
      result = rtf.format(-Math.floor(elapsed / 1000), 'seconds');
      // return rtf.format(-Math.floor(elapsed / 1000), 'seconds');
    } else if (elapsed < msPerHour) {
      result = rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes');
      // return rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes');
    } else if (elapsed < msPerDay) {
      result = rtf.format(-Math.floor(elapsed / msPerHour), 'hours');
      // return rtf.format(-Math.floor(elapsed / msPerHour), 'hours');
    } else if (elapsed < msPerMonth) {
      result = rtf.format(-Math.floor(elapsed / msPerDay), 'days');
      // return rtf.format(-Math.floor(elapsed / msPerDay), 'days');
    } else if (elapsed < msPerYear) {
      result = rtf.format(-Math.floor(elapsed / msPerMonth), 'months');
      // return rtf.format(-Math.floor(elapsed / msPerMonth), 'months');
    } else {
      result = rtf.format(-Math.floor(elapsed / msPerYear), 'years');
      // return rtf.format(-Math.floor(elapsed / msPerYear), 'years');
    }

    return result.slice(0, result.length - 3);
  }
}
