import './Paginate.scss';

import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
    pageCount: number;
    TotalItem?: number;
    handlePageClick: (event: any) => void;
    onChange: (event: any) => void;
}
const Paginate = (props: Props) => {
    const { handlePageClick, pageCount, TotalItem, onChange } = props;
    const perpage = [10, 25, 50, 75, 100];

    return (
        <div className="page-right">
            <ReactPaginate
                marginPagesDisplayed={1}
                className="react-paginate"
                breakLabel="..."
                nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
                renderOnZeroPageCount={() => null}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'previous'}
                disabledClassName={'previous-disabled'}
                previousLinkClassName={'a-link'}
                nextClassName={'next'}
                disabledLinkClassName={'next-disabled'}
                nextLinkClassName={'a-link'}
                breakClassName={'break-item'}
                breakLinkClassName={'break-link'}
                containerClassName={'pagination'}
                activeClassName={'active'}
                activeLinkClassName={'active-ol'}
            />
            <div className="info-product">
                <span>{TotalItem} items </span>
                <select onChange={onChange} name="count">
                    {perpage.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <span> per page</span>
            </div>
        </div>
    );
};
export default Paginate;
