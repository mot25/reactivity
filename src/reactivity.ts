let functionCal = undefined;
//  (prevValue === prevValue || newValue === newValue) проверка на NaN
const isChanged = (prevValue: any, newValue: any) =>
  prevValue !== newValue &&
  // eslint-disable-next-line no-self-compare
  (prevValue === prevValue || newValue === newValue);

function makeSubScribe(obj: any) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    let value = val;
    const deps = new Set();

    Object.defineProperty(acc, key, {
      get() {
        if (functionCal && !deps.has(functionCal)) deps.add(functionCal);
        return value;
      },
      set(newValue) {
        if (isChanged(val, newValue)) {
          value = newValue;
          //  @ts-ignore
          deps.forEach(f => f());
        }
      },
      enumerable: true
    });
    return acc;
  }, {});
}
const testObj: any = makeSubScribe({
  testA: 1,
  testB: 2
});

console.log(testObj.testA);

const subScribe = (fn: any) => {
  functionCal = fn;
  fn();
  functionCal = null;
};

subScribe(() => {
  console.log('testObj.testA', testObj.testA);
});
