
import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const SocailLogin = () => {
    const {signInGoogle} = useContext(AuthContext);

    const handleGoogleSignIn =() =>{
        signInGoogle()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <div>
              <div className="divider">OR</div>
            <div className='text-center'>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                   G
                </button>
            </div>
        </div>
    );
};

export default SocailLogin;