import React from 'react';
import Blogs from './Blogs';
// Just import the file

const ViewBlogs: React.FC = () => {
    // And use it after the h1 tag
    return (
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
            < Blogs />
        </div>
    );
}
export default ViewBlogs;