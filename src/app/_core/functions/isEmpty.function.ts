export const isEmpty = (object: object) => {
  if (object) {
    for (const i in object) {
      if (object.hasOwnProperty(i)) {
        return false;
      }

    }
  }
  return true;
};
