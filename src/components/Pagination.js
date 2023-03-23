import '../pages/styles/pagination.css'

export default function Pagination ({ items, total, pageNumber, pageSize, navigate }) {
  // const next
  return (
    <div className='pagination'>
      <button className='pagination-btn' disabled={pageNumber === 0} onClick={() => navigate(0)} title='first page'>&laquo;&laquo;</button>
      <button className='pagination-btn' disabled={pageNumber === 0} onClick={() => navigate(pageNumber - 1)} title='previous page'>&laquo;</button>
      {/* <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a> */}
      <button className='pagination-btn' disabled={pageNumber * pageSize + pageSize > total} onClick={() => navigate(pageNumber + 1)} title='next page'>&raquo;</button>
      <button className='pagination-btn' disabled={pageNumber * pageSize + pageSize > total} onClick={() => navigate(Math.floor(total / pageSize))} title='last page'>&raquo;&raquo;</button>
    </div>
  )
};
