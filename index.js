let functionCal = null
const testObj = makeSubScribe({
    testA: 1,
    testB: 2
})
console.log(testObj.testA)


const subScribe = (fn) => {
    functionCal = fn
    fn()
    functionCal = null
}
subScribe(() => {
    console.log('testObj.testA', testObj.testA)
})
//  (prevValue === prevValue || newValue === newValue) проверка на NaN
const isChanged = (prevValue, newValue) =>
    prevValue !== newValue && (prevValue === prevValue || newValue === newValue)

function makeSubScribe(obj) {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        let value = val
        const deps = new Set()
        Object.defineProperty(acc, key, {
            get() {
                if (functionCal && !deps.has(functionCal)) deps.add(functionCal)
                return value
            },
            set(newValue) {
                if (isChanged(val, newValue)) {
                    value = newValue
                    deps.forEach(f => f())
                }
            },
            enumerable: true,
        })
        return acc
    }, {})
}
