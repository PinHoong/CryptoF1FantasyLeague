const sum = require('./sum');
function stringHasTheWhiteSpaceOrNot(value){
    return value.indexOf(' ') >= 0;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('should return whether space is found in string', () =>{
    const result = stringHasTheWhiteSpaceOrNot('hello world');
    expect(result).toBe(true);
  });
  