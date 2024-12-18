"use client";

import {ReactNode} from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';

import { ErrorBoundary } from '@/components/tma/error-boundary';
import { ErrorPage } from '@/components/tma/error-page';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { useDidMount } from '@/hooks/useDidMount';
import { useClientOnce } from '@/hooks/useClientOnce';
import { init } from '@/init';

import './styles.css';

export function Root({children}: {children: ReactNode}) {
    // Mock Telegram environment in development mode if needed.
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useTelegramMock();
    }

    const lp = useLaunchParams();
    useClientOnce(() => {
        init(lp.startParam === 'debug');
    });
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
    // Rendering. That's why we are showing loader on the server side.
    const didMount = useDidMount();

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            {children}
        </ErrorBoundary>
    ) : <div className="root__loading">Loading</div>;
}