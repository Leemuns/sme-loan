import { z } from "zod";

const MAX_AMOUNT = 10 ** 10 - 1;

const todayLocalMidnight = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const toLocalMidnight = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export default {
  MAX_AMOUNT,
  todayLocalMidnight,
  toLocalMidnight,
};
