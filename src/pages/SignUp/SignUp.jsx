import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import SocailLogin from '../Shared/SocailLogin/SocailLogin';

const SignUp = () => {

    const {createUser} = useContext(AuthContext)

    const handleSignUP =e=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,email , password)

        createUser(email,password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200 py-24">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2 ">

                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center">Sign Up </h1>
                        <form onSubmit={handleSignUP}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" name='name' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn bg-[#ff3811] border-none" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>Have an Account ! <Link to='/login' className='text-[#ff3811] font-bold'> Sign in</Link></p>
                        <SocailLogin></SocailLogin>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;