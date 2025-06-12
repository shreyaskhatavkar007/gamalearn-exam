export const onlyUnique = <T>(array: T[]) => {
  return array.filter((value, index, array) => array.indexOf(value) === index);
};
