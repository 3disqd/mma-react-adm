import React, { useState } from 'react';
import { Button, Checkbox, Input, Select, TimePicker } from 'antd';
import ParsedSchedule from '../ParsedSchedule/ParsedSchedule';
const { Option } = Select;

//TODO запилить стили
const styles = {};

const days = [
  { id: 1, short: 'mon', long: 'Monday' },
  { id: 2, short: 'tue', long: 'Tuesday' },
  { id: 3, short: 'wed', long: 'Wednesday' },
  { id: 4, short: 'thu', long: 'Thursday' },
  { id: 5, short: 'fri', long: 'Friday' },
  { id: 6, short: 'sat', long: 'Saturday' },
  { id: 7, short: 'sun', long: 'Sunday' },
];

const options = days.map(day => (
  <Option key={day.id} value={day.id} label={day.short}>
    {day.long}
  </Option>
));

const InputSchedule = ({ value = {}, id, onChange = () => {} }) => {
  const [selectedDays, selectDays] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [dayOff, setDayOff] = useState(false);
  const [comment, setComment] = useState('');

  const setSchedule = () => {
    let res = {};
    if (allDay) {
      for (let i = 1; i < 8; i++) {
        res[i] = { from: '00:00', to: '23:59' };
      }
      res['is_24x7'] = true;
    } else {
      for (let i = 0; i < selectedDays.length; i++) {
        res[selectedDays[i]] = dayOff ? undefined : { from: from, to: to };
      }
      res['is_24x7'] = undefined;
    }

    res.comment = comment || undefined;

    console.log(res);
    onChange({
      target: { value: { ...value, ...res }, id },
    });
  };

  return (
    <div id={id} className={styles.workTimePickerCell}>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select days"
        disabled={allDay}
        // defaultValue={['a10', 'c12']}
        onChange={value => {
          selectDays(value);
        }}
        optionLabelProp="label"
        // size="small"

        // defaultValue={[1, 7]}
      >
        {options}
      </Select>
      <div className={styles.pickerWrapper}>
        Open:{' '}
        <TimePicker
          format={'HH:mm'}
          disabled={allDay || dayOff}
          onChange={(momentValue, stringValue) => {
            setFrom(stringValue);
          }}
          // size="small"
          // defaultValue={moment('03:30', 'HH:mm')}
        />
      </div>
      <div className={styles.pickerWrapper}>
        Close:{' '}
        <TimePicker
          format={'HH:mm'}
          disabled={allDay || dayOff}
          onChange={(momentValue, stringValue) => {
            setTo(stringValue);
          }}
          // size="small"
          // defaultValue={moment('23:30', 'HH:mm')}
        />
      </div>
      <br />
      <Checkbox
        checked={dayOff}
        onChange={e => {
          setDayOff(e.target.checked);
        }}
      >
        closed
      </Checkbox>
      <br />
      <Checkbox
        disabled={dayOff}
        checked={allDay}
        onChange={e => {
          setAllDay(e.target.checked);
        }}
      >
        Круглосуточно
      </Checkbox>
      <br />
      <Input
        // size="small"
        placeholder="small size"
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <Button
        disabled={!(selectedDays.length && ((from && to) || dayOff)) && !allDay}
        onClick={setSchedule}
        type="primary"
      >
        Применить
      </Button>
      {/*{JSON.stringify(value)}*/}
      <ParsedSchedule schedule={value} />
      {/*{parsedSchedule.map(i => (*/}
      {/*  <ParsedScheduleListItem item={i} key={i.firstDayNum + i.lastDayNum} />*/}
      {/*))}*/}
    </div>
  );
};

export default InputSchedule;
