import React from 'react';
import ViewBlog from './ViewBlog';

const ViewbBlog: React.FC = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <ViewBlog />
            </div>
        </div>
    );
}

export default ViewbBlog;
