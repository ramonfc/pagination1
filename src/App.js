import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './components/Pagination';
// import data from './data/mock-data.json';
import './style.scss';

let PageSize = 10;


export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const url = `http://localhost:8080/api/productos/?limit=${PageSize}&page=${currentPage}`;
  
  const [data, setData] = useState([]); 
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {          
            return response.json();
        }
        throw new Error('something went wrong while requesting posts');
      })
      .then((posts) => {        
        console.log(posts);
        setData(posts);
        setBusy(false);
      } )
      .catch((error) => setError(error.message));
  }, []);


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    console.log(data)
    return data["data"].slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return <div> 
    {!isBusy && !error? 
    (   
      <>
        <table>
          <thead>
            <tr>
              <th>id_sku</th>
              <th>sku</th>
              <th>title</th>
              <th>image</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(item => {
              return (
                <tr>
                  <td>{item.id_sku}</td>
                  <td>{item.sku}</td>
                  <td>{item.title_to_store}</td>
                  <td>{item.images_concat}</td>
                  <td>{item.meli_category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.info.countTotal}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </>
    )
    : (<h1>Sin datos</h1>)} 
    </div> ;
}
