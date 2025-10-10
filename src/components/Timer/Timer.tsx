import { useEffect, useState } from 'react';
import { getDaysBeforeDate } from '../../helpers/getDaysBeforeDate';

const Timer = ({ time }: {time: string}) => {

    const [currentTime, setCurrentTime] = useState(time)

    const { days, minutes, hours, seconds } = getDaysBeforeDate(time)
    const displayDays = (days) => {
        if (days == 1) {
            return "день"
        } else if (days > 1 && days < 5) {
            return "дня"
        } else if (days === 21) {
            return "день"
        } else if (days > 21 && days < 25) {
            return "дня"
        } else {
            return "дней"
        }
    }

    useEffect(() => {
        if (days < 1) {
            const timer = setInterval(() => {
                setCurrentTime(getDaysBeforeDate(currentTime))
            }, 1000)
        }
    }, [])

    return (
        <div className="time">
            {
                days < 1 ? `${hours}:${minutes > 9 ? minutes : `0` + minutes}:${seconds > 9 ? seconds : `0` + seconds}` :
                    `${days+1} ${displayDays(days+1)}`
            }
        </div>
    );
}

export default Timer;

