import { I18n } from './i18n';

export interface Translations {
  hello: {
    world: string
  };
  another: {
    very: {
      nested: {
        example: string
      }
    }
  };
}

interface AllTranslations {
  [language: string]: Translations;
}

export const allTranslations: AllTranslations = {
  de: {
    hello: {
      world: 'Welt'
    },
    another: {
      very: {
        nested: {
          example: 'Ein sehr verschachteltes Beispiel'
        }
      }
    }
  },
  en: {
    hello: {
      world: 'World'
    },
    another: {
      very: {
        nested: {
          example: 'Another very nested example'
        }
      }
    }
  }
};


describe('I18n', () => {
  const i18n = new I18n<Translations>('de', allTranslations);

  describe('t', () => {
    it('translates a simple value', () => {
      expect(i18n.t.hello.world).toEqual('Welt');
    });

    it('translates a nested value', () => {
      expect(i18n.t.another.very.nested.example).toEqual('Another very nested example');
    });
  });

  describe('tFromString', () => {
    it('translates a valid value', () => {
      expect(i18n.tFromString('another.very.nested.example')).toEqual('Another very nested example');
    });
  });

  describe('interpolate', () => {
    it('replaces passed params', () => {
      expect(i18n.interpolate('Translation with {param} and {param2} and {param}', {param: 'key', param2: 'key2'}))
        .toEqual('Translation with key and key2 and key');
    });

    it('ignores extra params', () => {
      expect(i18n.interpolate('Translation with no placeholder', {param: 'key'}))
        .toEqual('Translation with no placeholder');
    });

    it('does not replace missing params with an empty string but leaves the placeholder', () => {
      expect(i18n.interpolate('Translation with {missing}', {})).toEqual('Translation with {missing}');
    });
  });

  describe('pluralize', () => {
    const translationParent = {one: 'You have one translation', other: 'You have {count} translations'};

    it('returns other-key of translation parent if length is 0', () => {
      expect(i18n.pluralize(translationParent, 0)).toEqual('You have 0 translations');
      expect(i18n.pluralize(translationParent, 2)).toEqual('You have 2 translations');
      expect(i18n.pluralize(translationParent, 3)).toEqual('You have 3 translations');
    });

    it('returns one-key of translation parent if length is 1', () => {
      expect(i18n.pluralize(translationParent, 1)).toEqual(translationParent.one);
    });
  });
});
