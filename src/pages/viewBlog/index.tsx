import React from 'react';
import ViewBlog from './ViewBlog';
// Just import the file

const ViewbBlog: React.FC = () => {
    // And use it after the h1 tag
    return (
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                < ViewBlog/>
            </div>
    );
}
export default ViewbBlog;