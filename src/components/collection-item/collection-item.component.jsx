import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>

            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: `cover`
                }}

            />
            <div className='collection-footer'>
                <span className='name'> {name} </span>
                <span className='price'> {price}KM </span>
            </div>

            <CustomButton onClick={() => addItem(item)} inverted> Dodaj u košaricu</CustomButton>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);