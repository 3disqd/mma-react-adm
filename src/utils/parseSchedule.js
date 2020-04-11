export const parseSchedule = schedule => {

  if (schedule.is_24x7){
    return [{
      value: 'Круглосуточно',
    }]
  }


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
      value: schedule[interval[0]] || 'Выходной',
    });

    checked = [...checked, ...interval];
  }
  return res;
};