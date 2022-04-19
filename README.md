# keyes

> A tiny (322B + 1 dependency) package for intercepting keypresses
> and firing callbacks.

## Install

```
$ yarn add keyes
```

## Usage

`keyes` takes one or more Keys, consisting of a
[Key Value](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) and an
optional map of keyboard [modifiers](#modifiers).

```js
import keyes from 'keyes';
import fireToast from './fireToast';

window.addEventListener(
  'keydown',
  keyes(
    [
      {
        value: 'c',
        modifiers: { metaKey: true },
      },
      {
        value: 'c',
        modifiers: { ctrlKey: true },
      },
    ],
    fireToast,
  ),
);
```

## API

### Modifiers

The following modifier keys are available.

- [altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey)
- [ctrlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey)
- [metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey)
- [shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey)
