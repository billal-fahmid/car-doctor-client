import React, { useContext } from 'react';
import imgg from '../../assets/images/checkout/checkout.png';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';


const CheckOut = () => {
    const service = useLoaderData()
    console.log(service)
    const { title, service_id,price ,_id,img} = service
    const {user} = useContext(AuthContext);

    const handleCheckOut =(e) =>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const order ={
            customerName:name,
            email,
            date,
            img,
            service:title,
            service_id: _id,
            price
        }
        console.log(order)
        fetch(`https://car-doctor-server-billal-fahmid.vercel.app/checkouts`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            }  ,
            body:JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.insertedId){
                alert('CheckOut successfully')
            }
        })

    }

    return (

        <div >
            <div className='relative '>
                <img className='w-full' src={imgg} alt="" />
                <div className='bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]'>
                    <h2 className='text-5xl font-bold absolute left-8 top-1/2 text-white '>Check Out</h2>
                    <p className='text-xl font-bold text-center bg-[#ff3811] absolute bottom-0 text-white left-1/2 py-3 px-8 rounded-lg'>{title}/Checkout</p>
                </div>
            </div>

            <div className="card-body py-20">
                <form onSubmit={handleCheckOut}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered" />
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name='date' className="input input-bordered" />

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' defaultValue={user?.email} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" defaultValue={`${price} $`} className="input input-bordered" />

                        </div>
                    </div>
                    <div className="form-control mt-6">

                        <input className="btn bg-[#ff3811] border-none" type="submit" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CheckOut;