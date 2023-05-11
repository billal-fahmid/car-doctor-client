import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { img, price, title ,_id} = service
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body  ">
                <h2 className="card-title">{title}</h2>

                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold text-[#ff3811]'>Price : $ {price}</p>
                    <Link to={`/checkout/${_id}`}>
                        <button className='btn bg-[#ff3811] border-none'>Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;