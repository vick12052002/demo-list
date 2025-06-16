import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils';
import Cards from '../components/Cards';
import Table from '../components/Table';
import PageButton from '../components/PageButton';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    priceMin: '',
    priceMax: '',
    inStock: false,
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30); // 預設每頁顯示 30 筆
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false); // 判斷是否為手機裝置，node.js 環境下預渲染頁面，並將生成的 HTML 內容發送給 Client 端。

  useEffect(() => {
    async function fetchData() {
      try {
        //- 模擬資料由後端 api 取得
        const response = await fetch('/items.json');
        const result = await response.json();
        setData(result);
        setFilteredData(result); // 初始化時顯示所有資料

        // 過濾 category 並塞入 categories
        const uniqueCategories = [...new Set(result.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
        console.log('get data')
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('setLoading')
        setLoading(false);
      }
    }

    fetchData();

    // 監聽視窗大小變化
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debouncedFilter = useCallback(
    debounce((updatedFormData) => {
      const filtered = data.filter((item) => {
        const matchesName = updatedFormData.name
          ? item.name?.toLowerCase().includes(updatedFormData.name.toLowerCase())
          : true;
        const matchesCategory = updatedFormData.category
          ? item.category === updatedFormData.category
          : true;
        const matchesPriceMin = updatedFormData.priceMin
          ? item.price >= parseFloat(updatedFormData.priceMin)
          : true;
        const matchesPriceMax = updatedFormData.priceMax
          ? item.price <= parseFloat(updatedFormData.priceMax)
          : true;
        const matchesInStock = updatedFormData.inStock
          ? item.inStock === updatedFormData.inStock
          : true;

        return matchesName && matchesCategory && matchesPriceMin && matchesPriceMax && matchesInStock;
      });

      setFilteredData(filtered);
      setCurrentPage(1);
    }, 500),
    [data]
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData(updatedFormData);
    debouncedFilter(updatedFormData);
  }

  function handleItemsPerPageChange(event) {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleDirectPageInput(event) {
    const page = Math.max(1, Math.min(totalPages, Number(event.target.value) || 1));
    setCurrentPage(page);
  }

  function renderPagination() {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      );
    }

    pages.unshift(
      <PageButton 
        key="prev" 
        onClick={() => setCurrentPage(currentPage - 1)} 
        disabled={currentPage === 1} 
        className={currentPage === 1? 'disabled':''}
      >
        &lt;
      </PageButton>
    );

    pages.push(
      <PageButton 
        key="next" 
        onClick={() => setCurrentPage(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className={currentPage === totalPages? 'disabled':''}
      >
        &gt;
      </PageButton>
    );

    return pages;
  }

  function handleSortFilter (event){
      const sortOrder = event.target.value;
      const sortedData = [...filteredData].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else if (sortOrder === 'desc') {
          return b.price - a.price;
        }
        return 0; // Default order (no sorting)
      });
      setFilteredData(sortedData);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="max-w-screen-lg m-0 mx-auto">
      <form className="filter-container max-w-7xl" onSubmit={(event)=> event.preventDefault()}>
        <div className="input-box">
          <label htmlFor="name">名稱</label>
          <input
            type="text"
            name="name"
            placeholder="請輸入名稱"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="category">類別</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">全部</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="input-box">
          <label htmlFor="price">價格</label>
          <input
            type="number"
            name="priceMin"
            placeholder="最低價"
            min="1"
            value={formData.priceMin}
            onChange={handleChange}
          />
          <span>~</span>
          <input
            type="number"
            name="priceMax"
            placeholder="最高價"
            value={formData.priceMax}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          <label htmlFor="inStock">有庫存</label>
        </div>
      </form>
      <div className="sort-container">
        <label htmlFor="sort-price">排序：</label>
        <select
          id="sort-price"
          onChange={handleSortFilter}
        >
          <option value="">無排序</option>
          <option value="asc">價格低到高</option>
          <option value="desc">價格高到低</option>
        </select>
      </div>

      <div className="pagination">
        <p>
          Total: {filteredData.length}
        </p>
        <label htmlFor="items-per-page">每頁顯示：</label>
        <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>當前頁數：{currentPage}</span>
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
      {isMobile ? <Cards items={paginatedData} /> : <Table data={paginatedData} />}
    </main>
  );
}
