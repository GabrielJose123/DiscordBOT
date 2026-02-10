

const date = new Date();
const mouth = [1,2,3,4,5,6,7,8,9,10,11,12][date.getMonth()];
const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31][date.getDay()];



const HourLog = (text) => {
    const nowHour = `${day}-${mouth}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} |`; 

    console.log(`${nowHour} ${text}`);
};

module.exports = HourLog;


