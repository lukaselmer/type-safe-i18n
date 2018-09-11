import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AllTranslations } from '../i18n-base.types';

export class I18n<T> {
  t: T;

  private langSubject = new BehaviorSubject<string>('en');

  constructor(defaultLanguage = 'en', private allTranslations: AllTranslations<T>) {
    this.t = allTranslations[defaultLanguage];
  }

  setLang(lang: string) {
    this.getLang().pipe(first()).subscribe(currentLang => {
      if (lang === currentLang) { return; }
      this.t = this.allTranslations[lang];
      this.langSubject.next(lang);
    });
  }

  getLang(): Observable<string> {
    return this.langSubject.asObservable();
  }

  tFromString(translationKey: string): string {
    return translationKey.split('.')
      .reduce((current: any, part) => current[part], this.t);
  }

  interpolate(translation: string, params: {[key: string]: string}): string {
    return Object.keys(params).reduce((result, key) => result.split(`{${key}}`).join(params[key]), translation);
  }

  pluralize(translationParent: {one: string, other: string}, count: number): string {
    return this.interpolate(translationParent[count === 1 ? 'one' : 'other'], {count: count.toString()});
  }
}
