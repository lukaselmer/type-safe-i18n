import { Observable } from 'rxjs';
import { Translations } from './generated/i18n-interface';
import { allTranslations } from './generated/i18n-translations';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

export class I18n {
  static t: Translations = allTranslations['de'];

  private static langSubject = new BehaviorSubject<string>('de');

  static setLang(lang: string) {
    I18n.getLang().pipe(first()).subscribe(currentLang => {
      if (lang === currentLang) { return; }
      I18n.t = allTranslations[lang];
      I18n.langSubject.next(lang);
    });
  }

  static getLang(): Observable<string> {
    return I18n.langSubject.asObservable();
  }

  static tFromString(translationKey: string): string {
    return translationKey.split('.')
      .reduce((current: any, part) => current[part], I18n.t);
  }

  static interpolate(translation: string, params: {[key: string]: string}): string {
    return Object.keys(params).reduce((result, key) => result.split(`{${key}}`).join(params[key]), translation);
  }

  static pluralize(translationParent: {one: string, other: string}, count: number): string {
    return I18n.interpolate(translationParent[count === 1 ? 'one' : 'other'], {count: count.toString()});
  }
}
