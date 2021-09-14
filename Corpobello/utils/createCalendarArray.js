export default function createCalendarArray(body) {
  const hour = +body.date.hour;
  const hour2 = +body.date.hour + 1;
  let hoursArray = [];
  if (body.date.time === 60 && +body.date.minute === 0) {
    hoursArray = [{
      [hour]: [0, 30],
    }];
  } else if (body.date.time === 60 && +body.date.minute === 30) {
    hoursArray = [{
      [hour]: [30],
    },
    {
      [hour2]: [0],
    },
    ];
  } else if (body.date.time === 30) {
    hoursArray = [{
      [hour]: [+body.date.minute],
    },
    ];
  }

  return hoursArray;
}
