import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginator = ({ data, setData, paginator, setPaginator, setDataUrl, dataUrl }) => {

  const [number, setNumber] = useState([1,2,3,4,5,6,7,8,9,10]);
  let numero = [];

  const pushNumbers = () => {
    if(typeof paginator != 'undefined') {
      for (let index = paginator.from; index <= paginator.to; index++) {
        numero.push(index);
        console.log(numero);
      }
      setNumber(numero);
    }
  }

  useEffect(() => {
    pushNumbers();
  }, [number]);

  const handleNext = () => {
    setDataUrl(paginator.next_page_url);
    if (number[number.length-1]) {
      console.log(number[number.length-1]);
    }
  }
  
  if(typeof paginator != 'undefined') {
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem onClick={() => {setDataUrl(paginator.first_page_url)}} >
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem onClick={() => {setDataUrl(paginator.prev_page_url)}} >
          <PaginationLink previous href="#" />
        </PaginationItem>
        {
          number.map((page, index) => {
            return (
              <PaginationItem key={index} className={page===paginator.current_page ? "active" : null} >
                <PaginationLink href="#" onClick={() => {setDataUrl('http://localhost/clinica_sos-back/api/staff/patientList?page='+page)}}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })
        }
        <PaginationItem>
          <PaginationLink next href="#" onClick={() => handleNext()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" onClick={() => {setDataUrl(paginator.last_page_url)}} />
        </PaginationItem>
      </Pagination>
    );
  } else {
    return null;
  }
}

export default Paginator;