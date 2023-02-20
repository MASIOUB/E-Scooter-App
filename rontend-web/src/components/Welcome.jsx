import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';

function Welcome() {
    const dispatch = useDispatch()
    return (
        <div>
            Welcome back!
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}

export default Welcome