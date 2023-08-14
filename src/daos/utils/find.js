const {
  getSearchQuery,
  getSortQuery,
  getSelectQuery,
  getDateQuery,
} = require("./utils");

const find = async (
  model,
  {
    search,
    searchFields = [],
    dateField = "createdAt",
    query,
    offset,
    limit,
    fields,
    sort,
  }
) => {
  const s = getSearchQuery(model, searchFields, search);

  let { startDate, endDate, ...dataQuery } = query || {};

  if (startDate || endDate) {
    const dateQuery = getDateQuery(dateField, query.startDate, query.endDate);
    dataQuery = { ...dataQuery, ...dateQuery };
  }

  const total = await model.countDocuments(
    search ? { $or: s, ...dataQuery } : dataQuery
  );

  const documents = await model
    .find(search ? { $or: s, ...dataQuery } : dataQuery)
    .skip(offset || 0)
    .limit(limit || 10)
    .sort(getSortQuery(sort))
    .select(fields ? getSelectQuery(fields) : {})
    .lean();

  return { documents, total };
};

module.exports = { find };
