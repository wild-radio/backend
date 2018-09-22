export const format = date =>
  `${`0${date.getDate()}`.slice(-2)}/${`0${date.getMonth()}`.slice(
    -2,
  )}/${date.getFullYear()} - ${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(
    -2,
  )}:${`0${date.getSeconds()}`.slice(-2)}.${`000${date.getMilliseconds()}`.slice(-4)}`;

export default { format };
