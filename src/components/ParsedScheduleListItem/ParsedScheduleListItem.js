import React from 'react';
import styles from './ParsedScheduleListItem.module.css';

const ParsedScheduleListItem = ({ item = {} }) => (
  <p className={styles.parsedScheduleListItem}>
    <span>
      {intToWeekDay(item.firstDayNum) +
        (item.firstDayNum === item.lastDayNum
          ? ''
          : ` - ${intToWeekDay(item.lastDayNum)}`)}
    </span>
    :
    <span>
      {item.value && item.value.from && item.value.to
        ? `${item.value.from} - ${item.value.to}`
        : 'weekend'}
    </span>
  </p>
);

export default ParsedScheduleListItem;

export const intToWeekDay = int => {
  switch (int) {
    case 1:
      return 'пн';
    case 2:
      return 'вт';
    case 3:
      return 'ср';
    case 4:
      return 'чт';
    case 5:
      return 'пт';
    case 6:
      return 'сб';
    case 7:
      return 'вс';
    default:
      return int;
  }
};
