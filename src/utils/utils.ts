export const convertDate = (val: string) => {
    return new Date(val).toLocaleString("en", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
};

export const onlyUnique = <T>(array: T[]) => {
  return array.filter((value, index, array) => array.indexOf(value) === index);
};