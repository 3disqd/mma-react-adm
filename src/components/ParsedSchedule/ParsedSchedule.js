import React from 'react';
import styles from './ParsedSchedule.module.css';
import { parseSchedule } from '../../utils/parseSchedule';
import { intToWeekDay } from './ParsedScheduleListItem';

const ParsedSchedule = ({ schedule }) => {
  const parsedSchedule = parseSchedule(schedule || {});


  //TODO  'пн-вс' заменитьна 'ежедевно'
  return (
    <div className={styles.parsedSchedule}>
      {!parsedSchedule[0].firstDayNum ? (
        <p className={styles.parsedScheduleListItem}>
          <span>{parsedSchedule[0].value}</span>
        </p>
      ) : (
        parsedSchedule.map(item => (
          <p
            className={styles.parsedScheduleListItem}
            key={item.firstDayNum + item.lastDayNum}
          >
            <span>
              {intToWeekDay(item.firstDayNum) +
                (item.firstDayNum === item.lastDayNum
                  ? ''
                  : ` - ${intToWeekDay(item.lastDayNum)}`)}
            </span>
            :
            <span>
              {item.value.from && item.value.to
                ? `${item.value.from} - ${item.value.to}`
                : item.value}
            </span>
          </p>
        ))
      )}
      {schedule.comment && <p>{schedule.comment}</p>}
    </div>
  );
};

export default ParsedSchedule;
