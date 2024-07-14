import { ReactFlowProvider } from '@xyflow/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Provider } from './utils/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stacks frontend',
    description:
        'A Frontend for displaying stacks meant as a coding challenge for ZenML',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactFlowProvider>
                    <Provider>{children}</Provider>
                </ReactFlowProvider>
            </body>
        </html>
    );
}
