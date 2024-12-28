"use client";

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24 // 24 hours
        }
    }
});

const persister = createSyncStoragePersister({
    storage: window.localStorage
});

export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{persister}}
        >
            <div className='container mx-auto'>
                {children}
            </div>
            <ReactQueryDevtools />
        </PersistQueryClientProvider>
    )
}