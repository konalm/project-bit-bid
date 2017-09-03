const currentSearchQuery = (state = 'default', action) => {
  if (!state) {
    return [
      ...currentSearchQuery, { currentSearchQuery: '' }
    ];
  }

  return [
    ...currentSearchQuery,
    { currentSearchQuery: action.newSearchQuery }
  ];
}

export default currentSearchQuery
