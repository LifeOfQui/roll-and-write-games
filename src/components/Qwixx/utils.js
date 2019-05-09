export const calculateRows = num => {
  let val = 0;
  for (let i = 1; i <= num; i++) val = val + i;
  return val;
};
