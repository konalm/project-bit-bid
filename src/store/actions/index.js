export const changeSearchQuery = newSearchQuery => {
  return {
    type: 'CHANGE_SEARCH_QUERY',
    newSearchQuery: newSearchQuery
  }
}
