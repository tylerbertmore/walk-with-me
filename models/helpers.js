const db = require('../models');
const cron = require('node-cron');

let rollOver = () => {
    db.Dog.updateMany({},
        {$push: {schedule: { $each: [,,,,,,,,], $slice: -56}}},
        { multi: true },
        (err, renewedDogs) => {
            console.log(err);
        })
}

cron.schedule("40 56 8 * * * " , function(){
    rollOver();
    console.log('toad')
});

let format = array => {
    switch (array[1]) {
        case 0:
            array[1] = 'Monday';
        break;
        case 1:
            array[1] = 'Tuesday';
        break;
        case 2:
            array[1] = 'Wednesday';
        break;
        case 3:
            array[1] = 'Thursday';
        break;
        case 4:
            array[1] = 'Friday';
        break;
        case 5:
            array[1] = 'Saturday';
        break;
        case 6:
            array[1] = 'Sunday';
        break;
        default:
            array[1] = 'Today';
    }

    switch (array[2]) {
        case 0:
            array[2] = '9:00 AM';
        break;
        case 1:
            array[2] = '10:00 AM';
        break;
        case 2:
            array[2] = '11:00 AM';
        break;
        case 3:
            array[2] = '12:00 PM';
        break;
        case 4:
            array[2] = '1:00 PM';
        break;
        case 5:
            array[2] = '2:00 PM';
        break;
        case 6:
            array[2] = '3:00 PM';
        break;
        case 7:
            array[2] = '4:00 PM';
        break;
        default:
            array[2] = 'now';
    }
    return console.log(array);
}

let logger = entry => {
    console.log(entry);
}

module.exports = {format, logger};
