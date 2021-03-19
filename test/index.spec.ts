import test from 'japa'

test.group('Check if test runner is working', function () {
  test('Is assert function working properly', function (assert) {
    assert.equal<number>(2 + 2, 4)
  })
})
