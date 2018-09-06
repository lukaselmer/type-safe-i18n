import { I18n } from './i18n';

describe('I18n', () => {
  describe('t', () => {
    it('translates a simple value', () => {
      expect(I18n.t.costListing.cost).toEqual('Aufwand');
    });

    it('translates a nested value', () => {
      expect(I18n.t.payment.stripe.authorize.connected).toEqual('Verbindung hergestellt.');
    });
  });

  describe('tFromString', () => {
    it('translates a valid value', () => {
      expect(I18n.tFromString('payment.stripe.authorize.connected')).toEqual('Verbindung hergestellt.');
    });
  });

  describe('interpolate', () => {
    it('replaces passed params', () => {
      expect(I18n.interpolate('Translation with {param} and {param2} and {param}', {param: 'key', param2: 'key2'}))
        .toEqual('Translation with key and key2 and key');
    });

    it('ignores extra params', () => {
      expect(I18n.interpolate('Translation with no placeholder', {param: 'key'}))
        .toEqual('Translation with no placeholder');
    });

    it('does not replace missing params with an empty string but leaves the placeholder', () => {
      expect(I18n.interpolate('Translation with {missing}', {})).toEqual('Translation with {missing}');
    });
  });

  describe('pluralize', () => {
    const translationParent = {one: 'You have one translation', other: 'You have {count} translations'};

    it('returns other-key of translation parent if length is 0', () => {
      expect(I18n.pluralize(translationParent, 0)).toEqual('You have 0 translations');
      expect(I18n.pluralize(translationParent, 2)).toEqual('You have 2 translations');
      expect(I18n.pluralize(translationParent, 3)).toEqual('You have 3 translations');
    });

    it('returns one-key of translation parent if length is 1', () => {
      expect(I18n.pluralize(translationParent, 1)).toEqual(translationParent.one);
    });
  });
});
