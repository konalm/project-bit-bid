import React from 'react';

/**
 * Pagination JSX
 */
const Pagination = (props) => {
  var pageNo;
  var pageNos = [];
  const pageCount = Math.ceil(props.count / 10);

  for (pageNo = 1; pageNo <= pageCount; pageNo ++) {
    pageNos.push(<li><a href="#">{ pageNo }</a></li>);
  }

  return (
    <ul className="pagination">
      <li className="disabled"> <a href="#">&laquo;</a> </li>
      {pageNos}
      <li><a href="#">&raquo;</a></li>
    </ul>
  )
}

export default Pagination;
