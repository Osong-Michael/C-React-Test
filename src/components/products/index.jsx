import React, { useReducer, useRef, useState } from 'react';
import Product from '../product';

import { useFetch, useInfiniteScroll } from '../customHooks';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const FETCHING_PRODUCTS = 'FETCHING_PRODUCTS';
export const ADVANCE_PAGE = 'ADVANCE_PAGE';

const Products = () => {
    const [adId, setAdId] = useState(0);

    const productsReducer = (state, action) => {
        switch (action.type) {
          case ADD_PRODUCTS:
            return { ...state, products: state.products.concat(action.products) }
          case FETCHING_PRODUCTS:
            return { ...state, fetching: action.fetching }
          default:
            return state;
        }
    };

    const pageReducer = (state, action) => {
        switch (action.type) {
          case ADVANCE_PAGE:
            return { ...state, page: state.page + 1 }
          default:
            return state;
        }
    };

    const incrementPage = () => setAdId(adId + 1);

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
    const [productData, productDispatch] = useReducer(productsReducer, { products: [], fetching: true, });

    const [showEnd, setShowEnd] = useState(false);

    const productEnd = () => {
        productDispatch({ type: FETCHING_PRODUCTS, fetching: false });
        setShowEnd(true);
    };


    let bottomBoundaryRef = useRef(null);
    useFetch(pager, productDispatch, productEnd);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    const [sortValue, setSortValue] = useState(null);

    const sortBy = ['price', 'size', 'id'];

    const handleSortChange = e => setSortValue(e.target.value);

    let sortedProducts = [...productData?.products];
    if(sortValue !== null) {
        sortedProducts.sort((a, b) => {
            if (a[sortValue] < b[sortValue]) {
              return -1;
            }
            if (a[sortValue] > b[sortValue]) {
              return 1;
            }
            return 0;
        });
    }


    return (
        <div>
            <div className="sort-div">
                <label>Sort By:
                    <div className="select">
                        <select value={sortValue} onChange={handleSortChange}>
                            {sortBy.map(name => (<option key={name} value={name}>{name}</option>))}
                        </select>
                    </div>
                </label>
            </div>
            <div className="products" id='product-div'>
                {sortedProducts.map(product => (<Product key={Math.random()} {...product} />))}
            </div>
            {productData.fetching && (
                <div className="loading">
                    <p>Loading Products</p>
                    <div className="loader"></div>
                </div>
            )}
            {showEnd && (
                <div className="loading">
                <p>~ end of catalogue ~</p>
            </div>
            )}
            <div id='page-bottom-boundary' style={{ border: '1px solid transparent' }} ref={bottomBoundaryRef}></div>
        </div>
    );
};

export default Products;