import React from 'react';
import DummyButton from './DummyButton';
// Just import the file

const DummyB: React.FC = () => {
   
    // And use it after the h1 tag
    return (
        <div>
            <DummyButton />
        </div>
    );
}
export default DummyB;