import { Middleware } from 'redux';
import { redirect } from 'next/navigation';
import { RootState } from '@/store/store';

const authMiddleware: Middleware<unknown, RootState> = _store => next => (action: unknown) => {
    if (
        action.type.endsWith('/rejected') &&
        action.payload.status
    ) {
        const { status } = action.payload;

        if (status === 401 || status === 403) {
            // Redirect to login page
            redirect('/login');
        }
    }

    return next(action);
};

export default authMiddleware; 