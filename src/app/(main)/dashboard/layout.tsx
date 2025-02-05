// import { SubscriptionModalProvider } from '@/lib/providers/subscription-modal-provider';
import { getActiveProductsWithPrice } from '@/lib/supabase/queries';
import React from 'react';
import AppStateProvider from '@/lib/providers/state-provider'; // adjust the import path as needed

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  return (
    <main className="flex over-hidden h-screen">
      <AppStateProvider>
        {children}
        </AppStateProvider>
    </main>
  );
};

export default Layout;