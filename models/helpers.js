let format = array => {
    switch (array[2]) {
        case 0:
            array[2] = 'Monday';
        break;
        case 1:
            array[2] = 'Tuesday';
        break;
        case 2:
            array[2] = 'Wednesday';
        break;
        case 3:
            array[2] = 'Thursday';
        break;
        case 4:
            array[2] = 'Friday';
        break;
        case 5:
            array[2] = 'Saturday';
        break;
        case 6:
            array[2] = 'Sunday';
        default:
            array[2] = 'Today';
    }

    switch (array[1]) {
        case 0:
            array[1] = '9:00 AM';
        break;
        case 1:
            array[1] = '10:00 AM';
        break;
        case 2:
            array[1] = '11:00 AM';
        break;
        case 3:
            array[1] = '12:00 PM';
        break;
        case 4:
            array[1] = '1:00 PM';
        break;
        case 5:
            array[1] = '2:00 PM';
        break;
        case 6:
            array[1] = '3:00 PM';
        break;
        case 7:
            array[1] = '4:00 PM';
        break;
        default:
            array[1] = 'now';
    }
    return console.log(array);
}

let logger = entry => {
    console.log(entry);
}

module.exports = {format, logger};
