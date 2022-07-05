import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import Post from './components/post/post';
// import data from './data/mock-data.json';
import './App.scss';

let PageSize = 10;


export default function App() {
  const [currentPage, setCurrentPage] = useState(1);



  const [data, setData] = useState(null);
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `http://localhost:8080/api/productos/?limit=${PageSize}&page=${currentPage}`;
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
      })
      .catch((error) => setError(error.message));
  }, [currentPage]);


  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   console.log(data)
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, data]);

  return <div >
    {!isBusy && !error ?
      (
        <>
          {/* <table>
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
            {data?.data?.map(item => {
              return (
                <tr key={item.id_sku}>
                  <td>{item.id_sku}</td>
                  <td>{item.sku}</td>
                  <td>{item.title_to_store}</td>
                  <td>{item.images_concat}</td>
                  <td>{item.meli_category}</td>
                </tr>
              );
            }) || null}
          </tbody>
        </table> */}

          <div className='dataContainer'>
            {data?.data?.map(item => {
              console.log("first")
              return (
                <Post 
                key= {item.id_sku} 
                data={item} />
              )

            }) || null}

          </div>

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.info.countTotal}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </>
      )
      : (<h1>Cargando ...</h1>)}
  </div>;
}
