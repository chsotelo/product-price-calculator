export const sortRecordsByDate = ({ records }) => {
  const sortedRecords = records?.reduce(
    (acc, { groupId, createAt, ...rest }) => {
      const date = new Date(createAt);
      const existingGroup = acc.find((group) => group.groupId === groupId);

      existingGroup
        ? existingGroup.items.push({ ...rest, date })
        : acc.push({ groupId, items: [{ ...rest, date }] });
      existingGroup &&
        existingGroup.items.sort(
          (a, b) => new Date(a.createAt) - new Date(b.createAt)
        );

      return acc;
    },
    []
  );

  return sortedRecords;
};
