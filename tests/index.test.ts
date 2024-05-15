const Hello = () => {
  return 'word';
};

test('hello', () => {
  expect(Hello()).toBe('word');
});
