import github from '../github';
import * as gist from '../gist';

test('create', () => {
  expect(() => {
    gist
      .create({
        files: {
          empty: { content: 'empty' },
        },
        public: false,
        description: 'gist for test',
      })
      .then(res => github.gists.delete({ id: res.data.id }))
      .catch(error => {
        throw new Error(error);
      });
  }).not.toThrowError();
});

test('create gist with getOrCreate', () => {
  expect(() => {
    gist
      .getOrCreate()
      .then(res => github.gists.delete({ id: res.data.id }))
      .catch(error => {
        throw new Error(error);
      });
  }).not.toThrowError();
});

test('edit gist', () => {
  expect(() => {
    gist
      .edit({ empty: { content: 'not empty' } })
      .then(res => github.gists.delete({ id: res.data.id }))
      .catch(error => {
        throw new Error(error);
      });
  }).not.toThrowError();
});
