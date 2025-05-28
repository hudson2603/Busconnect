import React from 'react';
import { Link } from 'react-router-dom';
function Error() {
  return (
    <div>
        <div className='mt-40 ml-11'>    
            <h1>Error Found</h1>
            <Link to="/"><span className='text-blue-700 underline'>Go to Home</span></Link>
        </div>
    </div>
  )
}

export default Error