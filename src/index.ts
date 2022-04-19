import { dequal } from 'dequal';

export type Modifiers = {
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
};

export type Key = {
  value: string;
  modifiers?: Modifiers;
};

const keyMatchesEvent = (key: Key, event: KeyboardEvent): boolean => {
  const expectedModifiers = Object.assign(
    {},
    {
      ctrlKey: false,
      shiftKey: false,
      metaKey: false,
      altKey: false,
    },
    key.modifiers || {},
  );

  const eventModifiers = {
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
    altKey: event.altKey,
  };

  return key.value === event.key && dequal(expectedModifiers, eventModifiers);
};

const keyes =
  (key: Key | Key[], cb: (event: KeyboardEvent) => void) =>
  (e: KeyboardEvent): void => {
    const shouldFireCallback = Array.isArray(key)
      ? key.some((k) => keyMatchesEvent(k, e))
      : keyMatchesEvent(key, e);

    if (shouldFireCallback) {
      cb(e);
    }
  };

export default keyes;
