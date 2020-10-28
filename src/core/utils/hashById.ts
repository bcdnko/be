export const hashById = (data: any[]) => {
  return data.reduce((byId: any, item: any) => {
    byId[item.id] = item;
    return byId;
  }, {});
};

