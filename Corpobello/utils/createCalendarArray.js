export default function createCalendarArray(body) {
  let hour = +body.date.hour;
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
      [hour += 1]: [0],
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
