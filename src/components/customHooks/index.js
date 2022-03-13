import { useEffect, useCallback, useRef } from 'react';

import { ADD_PRODUCTS, FETCHING_PRODUCTS, ADVANCE_PAGE } from '../products';

// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch, endFetch) => {
  useEffect(() => {
    dispatch({ type: FETCHING_PRODUCTS, fetching: true })
    fetch(`http://localhost:3000/api/products?_page=${data.page}&_limit=20`)
      .then(data => data.json())
      .then(products => {
        if(products.length) {
          dispatch({ type: ADD_PRODUCTS, products })
          dispatch({ type: FETCHING_PRODUCTS, fetching: false })
        } else {
          endFetch();
        }
      })
      .catch(e => {
        console.log(e.error);
        dispatch({ type: FETCHING_PRODUCTS, fetching: false })
        return e;
      })
  }, [dispatch, data.page])
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: ADVANCE_PAGE });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}