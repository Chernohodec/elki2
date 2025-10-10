export const getDaysBeforeDate = (finalDate:string) => {

    const dateFuture = new Date(finalDate);
    const dateNow = new Date();

    let seconds = Math.floor((dateFuture - (dateNow))/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    }
    // return `${hours}:${minutes>9 ?minutes : `0` + minutes }:${seconds>9 ?seconds : `0` + seconds}`
}