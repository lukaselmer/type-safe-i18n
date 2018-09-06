# Type Safe I18n for TypeScript
git clone git@github.com:renuo/lawoon-frontend.git

## Translations

Translations are held in `public/i18n/{locale}.json` and generated on each server start.
If you add new keys and want to generate without server start, run:

```sh
bin/generate-i18n
```

Translations can be nested:

```json
{
  "parentKey": {
     "childKey": "Child Value"
  }
}
```

With the generate-command a static `.ts`-File is created. All translations are available via the static class `I18n.t.`
(e.g. `I18n.t.example`). The keys will be sorted in the `bin/check` via `bin/prettify-translations`.

### Interpolation

_Example:_

Given the translation

```json
{
  "example": "Hello {name}."
}
```

```ts
// returns 'Hello world':
I18n.interpolate(i18n.t.example, {name: 'World'})
```

### Pluralize

Pluralization can be done via `I18n.pluralize(translationString, counter)`, while translationString would be
a translation passed via `I18n.t.` and the counter a variable with the length. You can add two translations
to a key: `one` for the length 1 and `other` for all other lengths. All variables named `count` will be replaced
automatically via pluralize.

_Example:_

```ts
// selects `I18n.t.example.one` or `I18n.t.example.other` key pending on `exampleArray.length`
I18n.pluralize(I18n.t.example, exampleArray.length)
```

and the translations:

```json
{
  "example": {
    "one": "There is one example.",
    "other": "There are {count} examples."
  }
}
```
