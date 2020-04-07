import React, { useState } from 'react';
import styles from './WorkTimePickerCell.module.css';
import { TimePicker, Checkbox, Select, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;
// import moment from 'moment';

// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const days = [
  { id: 1, short: 'Mon', long: 'Monday' },
  { id: 2, short: 'Tue', long: 'Tuesday' },
  { id: 3, short: 'Wed', long: 'Wednesday' },
  { id: 4, short: 'Thu', long: 'Thursday' },
  { id: 5, short: 'Fri', long: 'Friday' },
  { id: 6, short: 'Sat', long: 'Saturday' },
  { id: 7, short: 'Sun', long: 'Sunday' },
];
//
const options = days.map(day => (
  <Option key={day.id} value={day.id} label={day.short}>
    {day.long}
  </Option>
));

const WorkTimePickerCell = () => {
  const [value, setValue] = useState({});
  const [selectedDays, selectDays] = useState([1, 7]);
  const [from, setFrom] = useState('03:30');
  const [to, setTo] = useState('23:30');
  const [allDay, setAllDay] = useState(false);

  const setSchedule = () => {
    // console.log(momentRange);
    // console.log(range);
    let res = {};
    for (let i = 0; i < selectedDays.length; i++) {
      res[selectedDays[i]] = { from: from, to: to };
    }
    setValue({ ...value, ...res });
    console.log(parseScheduleToString({ ...value, ...res }));
  };

  return (
    <div className={styles.workTimePickerCell}>
      Days:{' '}
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        // defaultValue={['a10', 'c12']}
        dropdownClassName={styles.selectDropDown}
        onChange={value => {
          selectDays(value);
        }}
        optionLabelProp="label"
        defaultValue={[1, 7]}
      >
        {options}
      </Select>
      Open:{' '}
      <TimePicker
        format={'HH:mm'}
        disabled={allDay}
        onChange={(momentValue, stringValue) => {
          setFrom(stringValue);
        }}
        defaultValue={moment('03:30', 'HH:mm')}
      />
      Close:{' '}
      <TimePicker
        format={'HH:mm'}
        disabled={allDay}
        onChange={(momentValue, stringValue) => {
          setTo(stringValue);
        }}
        defaultValue={moment('23:30', 'HH:mm')}
      />
      <br />
      <Checkbox
        checked={allDay}
        onChange={e => {
          setAllDay(e.target.checked);
        }}
      >
        Круглосуточно
      </Checkbox>
      <Button onClick={setSchedule} type="primary">
        Set
      </Button>
      {/*{JSON.stringify(value)}*/}
      <br />
    </div>
  );
};

export default WorkTimePickerCell;

const parseScheduleToString = schedule => {
  const checkNext = (obj, itemNum, res) => {
    if (itemNum === 8) {
      return res;
    }
    const value = obj[itemNum]?.from || 'hz';
    const nextValue = obj[itemNum + 1]?.from || 'hz';
    if (value === nextValue) {
      return checkNext(obj, itemNum + 1, [...res, itemNum + 1]);
    }
    return res;
  };

  const intToWeekDay = int => {
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

  let res = [];

  let checked = [];

  while (checked.length < 7) {
    const interval = checkNext(schedule, checked.length + 1, [
      checked.length + 1,
    ]);

    res.push({
      name:
        intToWeekDay(interval[0]) +
        (interval.length > 1
          ? ` - ${intToWeekDay(interval[interval.length - 1])}`
          : ''),
      value: schedule[interval[0]] || 'weekend',
    });

    checked = [...checked, ...interval];
  }
  return res;
};
