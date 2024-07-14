import React from 'react';

// SVG is taken from https://loading.io/
const LoadingPage = (props: { text?: string }) => {
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
                fontSize: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="200"
                height="200"
            >
                <g>
                    <circle fill="#e15b64" r="10" cy="50" cx="84">
                        <animate
                            begin="0s"
                            keySplines="0 0.5 0.5 1"
                            values="10;0"
                            keyTimes="0;1"
                            calcMode="spline"
                            dur="0.25s"
                            repeatCount="indefinite"
                            attributeName="r"
                        ></animate>
                        <animate
                            begin="0s"
                            values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="discrete"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="fill"
                        ></animate>
                    </circle>
                    <circle fill="#e15b64" r="10" cy="50" cx="16">
                        <animate
                            begin="0s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="0;0;10;10;10"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="r"
                        ></animate>
                        <animate
                            begin="0s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="16;16;16;50;84"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="cx"
                        ></animate>
                    </circle>
                    <circle fill="#f47e60" r="10" cy="50" cx="50">
                        <animate
                            begin="-0.25s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="0;0;10;10;10"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="r"
                        ></animate>
                        <animate
                            begin="-0.25s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="16;16;16;50;84"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="cx"
                        ></animate>
                    </circle>
                    <circle fill="#f8b26a" r="10" cy="50" cx="84">
                        <animate
                            begin="-0.5s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="0;0;10;10;10"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="r"
                        ></animate>
                        <animate
                            begin="-0.5s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="16;16;16;50;84"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="cx"
                        ></animate>
                    </circle>
                    <circle fill="#abbd81" r="10" cy="50" cx="16">
                        <animate
                            begin="-0.75s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="0;0;10;10;10"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="r"
                        ></animate>
                        <animate
                            begin="-0.75s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                            values="16;16;16;50;84"
                            keyTimes="0;0.25;0.5;0.75;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="cx"
                        ></animate>
                    </circle>
                    <g></g>
                </g>
            </svg>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {props.text || 'Loading... Please wait.'}
            </h2>
        </div>
    );
};

export default LoadingPage;
