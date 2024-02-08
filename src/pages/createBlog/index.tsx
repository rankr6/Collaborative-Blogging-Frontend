import React from 'react';
import CreateBlogForm from './CreateBlogForm';
// Just import the file

const CreateBlog: React.FC = () => {
    // And use it after the h1 tag
    return (
        <div>
            < CreateBlogForm />
        </div>
    );
}
export default CreateBlog;