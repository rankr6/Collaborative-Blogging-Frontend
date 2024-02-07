import React from 'react';
// Just import the file
import SigninForm from "./SigninForm"

const Signin: React.FC = () => {
    // And use it after the h1 tag
    return (
        <div>
            <SigninForm />
        </div>
    );
}
export default Signin;