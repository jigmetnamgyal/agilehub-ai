const truncateStr = (str: string, num: number) => {
  const truncatedStr = str?.substring(0, num);
  return truncatedStr;
};

export default truncateStr;
