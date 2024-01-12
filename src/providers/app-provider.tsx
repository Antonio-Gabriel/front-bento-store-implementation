"use client"

import * as React from 'react';

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Notifications } from '@/components/notifications/notifications'

type AppProviderProps = {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={<p>loading...</p> }
    >
      <QueryClientProvider client={queryClient}>
        <Notifications />
        { children }
      </QueryClientProvider>
    </React.Suspense>
  )
}