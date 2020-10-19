const db = require('../models');
const cron = require('node-cron');

let today = 0;

cron.schedule("* 17 * * *" , function(){
    today++
    adjust();
    rollOver();
    console.log('weektest ', week)
});

let week;

let rollOver = () => {
    db.Dog.updateMany({},
        {$push: {schedule: { $each: [,,,,,,,,], $slice: -56}}},
        { multi: true },
        (err, renewedDogs) => {
            if (err) return console.log(err);
            db.User.updateMany({},
                {$push: {schedule: { $each: [,,,,,,,,], $slice: -56}}},
                { multi: true },
                (err, renewedUsers) => {
                    if (err) return console.log(err);
            })
    })
}

let format = array => {
    array[1] = (array[1] % today)
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
}

let adjust = () => {
    week = [6,0,1,2,3,4,5]
    week.forEach((item, index) => {
       week[index] = (item + today) % 7
    })
    week.forEach((item, index) => {
        switch (item) {
            case 0:
                week[index] = 'Monday';
            break;
            case 1:
                week[index] = 'Tuesday';
            break;
            case 2:
                week[index] = 'Wednesday';
            break;
            case 3:
                week[index] = 'Thursday';
            break;
            case 4:
                week[index] = 'Friday';
            break;
            case 5:
                week[index] = 'Saturday';
            break;
            case 6:
                week[index] = 'Sunday';
            break;
            default:
                week[index] = 'Today';
        }
    })
    return week;
}

adjust();

module.exports = {format, adjust, week};
