export const isEgldToken = (name?: string) => {
  if (!name) {
    return false;
  }
  return ['egld', 'xegld', 'wegld', 'rewa', 'xrewa', 'wrewa'].includes(name?.toLowerCase());
};
