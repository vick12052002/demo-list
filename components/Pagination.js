import React from 'react';

export default function Pagination({
  filteredData,
  itemsPerPage,
  currentPage,
  totalPages,
  handleItemsPerPageChange,
  handleDirectPageInput,
  renderPagination,
}) {
  return (
    <div className='p-2.5 gap-2 flex-auto text-center'>
      <p>總共: {filteredData.length} 筆，當前頁數：{currentPage}</p>
      <label htmlFor="items-per-page">每頁顯示：</label>
      <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <label htmlFor="direct-page-input">跳至頁數：</label>
      <input
        id="direct-page-input"
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={handleDirectPageInput}
      />
      <div className="page-buttons">{renderPagination()}</div>
    </div>
  );
}