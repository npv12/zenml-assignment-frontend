import React from 'react';

const ErrorPage = (props: { text?: string }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
                color: '#333',
                fontSize: '20px',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="128"
                height="128"
                viewBox="0 0 128 128"
                style={{ fill: 'red' }} // Add this line to make the svg red
            >
                <defs></defs>
                <g transform="translate(0.703125 0.703125) scale(1.40625 1.40625)">
                    <path
                        d="M 24.959 68.04 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 40.081 -40.081 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 L 27.081 67.161 C 26.495 67.747 25.727 68.04 24.959 68.04 z"
                        transform=" matrix(1 0 0 1 0 0) "
                        stroke-linecap="round"
                    />
                    <path
                        d="M 65.04 68.04 c -0.768 0 -1.535 -0.293 -2.121 -0.879 L 22.838 27.081 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 40.081 40.081 c 1.172 1.171 1.172 3.071 0 4.242 C 66.575 67.747 65.808 68.04 65.04 68.04 z"
                        transform=" matrix(1 0 0 1 0 0) "
                        stroke-linecap="round"
                    />
                    <path
                        d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 6 C 23.495 6 6 23.495 6 45 s 17.495 39 39 39 s 39 -17.495 39 -39 S 66.505 6 45 6 z"
                        transform=" matrix(1 0 0 1 0 0) "
                        stroke-linecap="round"
                    />
                </g>
            </svg>
            <div className="mt-5">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {props.text || 'Loading... Please wait.'}
                </h2>
            </div>
        </div>
    );
};

export default ErrorPage;
