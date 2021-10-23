export const sortByProperty = (list, property) => {
  return (list || []).sort(
    (a, b) => a && b && parseFloat(a[property]) - parseFloat(b[property])
  );
};
