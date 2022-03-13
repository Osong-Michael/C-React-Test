import React from 'react';
import { dayFormatter } from '../helpers';

const Product = ({ face, size, price, date }) => {
    return (
        <div className="product">
            <p className="product-face" style={{ fontSize: `${size}px`}}>
                {face}
            </p>
            <div className="product-details">
                <p className="price">${price}</p>
                <p className="date">{dayFormatter(date)}</p>
            </div>
        </div>
    )
};

export default Product;