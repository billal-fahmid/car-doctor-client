import React, { useContext, useEffect, useState } from 'react';
import img from '../../assets/images/checkout/checkout.png'
import { AuthContext } from '../../provider/AuthProvider';
import BookingRow from './BookingRow';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { user } = useContext(AuthContext)

    const [bookings, setBookings] = useState([])
    const navigate = useNavigate()

    const handleDelete =id=>{
        console.log(id)
        const proceed = confirm('Are you sure ! you want delete this')
        if(proceed){
            fetch(`https://car-doctor-server-billal-fahmid.vercel.app/checkouts/${id}`,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount){
                    alert('Delete successfully')
                    const remaining = bookings.filter(booking=> booking._id !== id);
                    setBookings(remaining)
                }
            })
        }
    }

    const handleConfirm =(id)=>{
        console.log(id)
        fetch(`https://car-doctor-server-billal-fahmid.vercel.app/checkouts/${id}` ,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount >0){
                alert('updated Successfully')
                const remaining = bookings.map(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status='confirm';
                const  newBookings =[updated,...remaining]
                setBookings(newBookings)
            }
        })
    }

    const url = `https://car-doctor-server-billal-fahmid.vercel.app/checkouts?email=${user?.email}`

    useEffect(() => {
        fetch(url,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }
            })
    }, [url , navigate])

    return (
        <div>
            <div className='relative '>
                <img className='w-full' src={img} alt="" />

                <div className='bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]'>
                    <h2 className='text-5xl font-bold absolute left-8 top-1/2 text-white '>Bookings</h2>
                    <p className='text-xl font-bold text-center bg-[#ff3811] absolute bottom-0 text-white left-1/2 py-3 px-8 rounded-lg'>Your/Booking : {bookings.length}</p>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Customer & Email</th>
                            <th>Service</th>
                            <th>Date </th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        bookings.map(booking=> <><BookingRow key={booking._id} booking={booking} handleConfirm={handleConfirm} handleDelete={handleDelete}></BookingRow></>)
                      }
                       
                       
                    </tbody>
                    

                </table>
            </div>

        </div>
    );
};

export default Bookings;