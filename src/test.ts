import test from 'ava';

import keyes from './';

const modifiers = {
  ctrlKey: false,
  shiftKey: false,
  metaKey: false,
  altKey: false,
};

test('keyes - returns a function', (t) => {
  const fn = keyes({ value: 'c' }, () => {});
  t.true(fn instanceof Function);
});

test('keyes - returns true if any keys match - single', (t) => {
  t.plan(1);
  const event = {
    key: 'c',
    ...modifiers,
  };
  const fn = keyes({ value: 'c' }, () => {
    t.pass();
  });

  fn(event as KeyboardEvent);
});

test('keyes - returns false if no keys match - single', (t) => {
  t.plan(0);
  const event = {
    key: 'd',
    ...modifiers,
  };
  const fn = keyes({ value: 'c' }, () => {
    t.fail();
  });

  fn(event as KeyboardEvent);
});

test('keyes - returns false if any keys match - multiple', (t) => {
  t.plan(1);
  const event = {
    key: 'c',
    ...modifiers,
  };
  const fn = keyes([{ value: 'a' }, { value: 'b' }, { value: 'c' }], () => {
    t.pass();
  });

  fn(event as KeyboardEvent);
});

test('keyes - returns false if no keys match - multiple', (t) => {
  t.plan(0);
  const event = {
    key: 'f',
    ...modifiers,
  };
  const fn = keyes([{ value: 'a' }, { value: 'b' }, { value: 'c' }], () => {
    t.fail();
  });

  fn(event as KeyboardEvent);
});

test('keyes - returns false if any keys match - multiple w/ modifiers', (t) => {
  t.plan(1);
  const event = {
    key: 'c',
    ...Object.assign({}, modifiers, { metaKey: true }),
  };
  const fn = keyes(
    [
      { value: 'c', modifiers: { ctrlKey: true } },
      { value: 'c', modifiers: { metaKey: true } },
    ],
    () => {
      t.pass();
    },
  );

  fn(event as KeyboardEvent);
});

test('keyes - returns false if no keys match - multiple w/ modifiers', (t) => {
  t.plan(0);
  const event = {
    key: 'c',
    ...modifiers,
  };
  const fn = keyes(
    [
      { value: 'c', modifiers: { ctrlKey: true } },
      { value: 'c', modifiers: { metaKey: true } },
    ],
    () => {
      t.fail();
    },
  );

  fn(event as KeyboardEvent);
});
