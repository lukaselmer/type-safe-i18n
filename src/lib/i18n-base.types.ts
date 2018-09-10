export interface Translation {
  [key: string]: string;
}

export interface AllTranslations<T> {
  [language: string]: T;
}
