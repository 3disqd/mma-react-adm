import React, { useState } from 'react';
import { parseSchedule } from '../../utils/parseSchedule';
import { Button, Checkbox, Select, TimePicker } from 'antd';
import ParsedScheduleListItem from '../ParsedScheduleListItem/ParsedScheduleListItem';
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
  const [closed, setClosed] = useState(false);

  const setSchedule = () => {
    let res = {};
    for (let i = 0; i < selectedDays.length; i++) {
      res[selectedDays[i]] = closed ? undefined : { from: from, to: to };
    }
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
        // defaultValue={['a10', 'c12']}
        onChange={value => {
          selectDays(value);
        }}
        optionLabelProp="label"
        size="small"

        // defaultValue={[1, 7]}
      >
        {options}
      </Select>
      <div className={styles.pickerWrapper}>
        Open:{' '}
        <TimePicker
          format={'HH:mm'}
          disabled={allDay || closed}
          onChange={(momentValue, stringValue) => {
            setFrom(stringValue);
          }}
          size="small"
          // defaultValue={moment('03:30', 'HH:mm')}
        />
      </div>
      <div className={styles.pickerWrapper}>
        Close:{' '}
        <TimePicker
          format={'HH:mm'}
          disabled={allDay || closed}
          onChange={(momentValue, stringValue) => {
            setTo(stringValue);
          }}
          size="small"
          // defaultValue={moment('23:30', 'HH:mm')}
        />
      </div>
      <br />
      <Checkbox
        checked={closed}
        onChange={e => {
          setClosed(e.target.checked);
        }}
      >
        closed
      </Checkbox>
      <br />
      <Checkbox
        disabled={closed}
        checked={allDay}
        onChange={e => {
          setAllDay(e.target.checked);
        }}
      >
        Круглосуточно
      </Checkbox>
      <Button
        disabled={!(selectedDays.length && ((from && to) || allDay || closed))}
        onClick={setSchedule}
        type="primary"
      >
        Set
      </Button>
      {/*{JSON.stringify(value)}*/}
      {parseSchedule(value).map(i => (
        <ParsedScheduleListItem item={i} key={i.name} />
      ))}
      <br />
    </div>
  );
};

export default InputSchedule;
