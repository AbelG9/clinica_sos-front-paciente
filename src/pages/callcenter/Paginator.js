import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginator = ({ paginator, setPage, page }) => {

  const [number, setNumber] = useState([1,2,3,4,5,6,7,8,9,10]);
  

  const handleNumbers = (value) => {
    let ArrayNumber = [];
    let start = page;
    let end = page + 9;
    for (let index = start; index <= end; index++) {
      ArrayNumber.push(index);
    }
    return ArrayNumber;
  }

  useEffect(() => {
    if ((parseInt(number[number.length-1]+1) === page)) {
      setNumber(handleNumbers(page));
    } else if ((parseInt(number[0]) - 1) === page) {
      setNumber(handleNumbers(page));
    }
  }, [page]);

  const handleNext = () => {
    if (page === paginator.last_page) {
      setPage(page);
    } else {
      setPage(page + 1);
    }
  }

  const handleBack = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
      // if ((number[0]-1) === (paginator.current_page - 1)) {
      //   setCurrentFace(currentFace - 10);
      //   setNumber(handleNumbers(currentFace));
      // }
    }
  }

  const handlePage = (current) => {
    setPage(current);

  }

  const handleFirst = () => {
    setPage(1);
  }

  const handleLast = () => {
    setPage(paginator.last_page);
  }
  
  if(typeof paginator != 'undefined') {
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem onClick={() => handleFirst()} >
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem onClick={() => handleBack()} >
          <PaginationLink previous href="#" />
        </PaginationItem>
        {
          number.map((page, index) => {
            return (
              <PaginationItem key={index} className={page===paginator.current_page ? "active" : null} >
                <PaginationLink href="#" onClick={() => handlePage(page)}>
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
          <PaginationLink last href="#" onClick={() => handleLast()} />
        </PaginationItem>
      </Pagination>
    );
  } else {
    return null;
  }
}

export default Paginator;