import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent1 = ({handlePrevious, handleNext, setPage, page, pageCount}) => {
  return (
    <>
      {pageCount > 0 ?  <div className="flex justify-center mt-[2%]">
          <Pagination>
            <Pagination.Prev onClick={()=>handlePrevious()} disabled={page === 1} />
            {Array(pageCount)
              .fill(null)
              .map((ele, index) => (
                <>
                  <Pagination.Item key={index} active={page === index + 1 ? true : false} onClick={()=>setPage(index+1)}>{index + 1}</Pagination.Item>
                </>
              ))}

            <Pagination.Next
              onClick={()=>handleNext()}
              disabled={page === pageCount}
            />
          </Pagination>
        </div>
        : ""
}    </>
  )
}

export default PaginationComponent1
