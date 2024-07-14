'use client';

import { useParams } from 'next/navigation';

export default function StackPage() {
    const { id } = useParams();
    console.log(id);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>Index Page</div>
        </main>
    );
}
