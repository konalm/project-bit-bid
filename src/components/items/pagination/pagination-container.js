import React from 'react'
import PaginationJsx from './pagination.jsx';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var pageNo;
    var pageNos = []
    const pageCount = Math.ceil(this.props.count / 10);

    for (pageNo = 1; pageNo <= pageCount; pageNo ++) {
      const x = pageNo;
      pageNos.push(
        <li>
          <a
            onClick={ (event) => this.props.handlePageNoChange(event, x) }
            href="#"
          >
            { pageNo }
          </a>
        </li>
      );
    }

    return (
      <ul className="pagination">
        <li className="disabled"> <a href="#">&laquo;</a> </li>
        {pageNos}
        <li><a href="#">&raquo;</a></li>
      </ul>
    )
  }
}

export default Pagination;
