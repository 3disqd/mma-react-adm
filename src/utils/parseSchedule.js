export const parseSchedule = schedule => {
  const checkNext = (obj, itemNum, res) => {
    if (itemNum === 7) {
      return res;
    }
    const valueFrom = obj[itemNum]?.from || 'hz';
    const nextValueFrom = obj[itemNum + 1]?.from || 'hz';
    const valueTo = obj[itemNum]?.to || 'hz';
    const nextValueTo = obj[itemNum + 1]?.to || 'hz';
    if (valueFrom === nextValueFrom && valueTo === nextValueTo) {
      return checkNext(obj, itemNum + 1, [...res, itemNum + 1]);
    }
    return res;
  };

  let res = [];

  let checked = [];

  while (checked.length < 7) {
    const interval = checkNext(schedule, checked.length + 1, [
      checked.length + 1,
    ]);

    res.push({
      firstDayNum: interval[0],
      lastDayNum: interval[interval.length - 1],
      name:
        intToWeekDay(interval[0]) +
        (interval.length > 1
          ? ` - ${intToWeekDay(interval[interval.length - 1])}`
          : ''),
      value: schedule[interval[0]],
    });

    checked = [...checked, ...interval];
  }
  return res;
};

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