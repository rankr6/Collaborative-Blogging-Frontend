import React from 'react';
import Blogs from './Blogs';

const ViewBlogs: React.FC = () => {
    return (
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md flex justify-center">
            <Blogs />
        </div>
    );
}

export default ViewBlogs;
