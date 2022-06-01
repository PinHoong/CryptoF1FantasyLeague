function dummyRaceCalculator(value1, value2) {
    const fastest = JSON.parse(localStorage.getItem('Fastest'));
    const fastestEver = JSON.parse(localStorage.getItem('FastestEver'));
    const average = JSON.parse(localStorage.getItem('Average'));
    const slowest = JSON.parse(localStorage.getItem('Slowest'));
    const optimalCFR = JSON.parse(localStorage.getItem('optimalCFR'));

    if (value2 == optimalCFR) {
        value1 += 10;
        if (value1 >= 141 & value1 < 165) {
            return ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
        } else if (value1 >= 165 & value1 < 172) {
            return ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
        } else {
            return ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
        }
    } else {
        var random_boolean = Math.random() < 0.5;
        if (random_boolean) {
            return 0;
        } else {
            if (value1 >= 141 & value1 < 165) {
                return ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
            } else if (value1 >= 165 & value1 < 172) {
                return ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
            } else {
                return ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
            }
        }
    }
}