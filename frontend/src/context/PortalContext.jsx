import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PortalContext
 * Allows portal pages (Officer, Admin) to inject custom content
 * into the global Navbar — merging everything into a single bar.
 *
 * Usage from a portal page:
 *   const { setPortal } = usePortal();
 *   useEffect(() => {
 *       setPortal({ title: '...', content: <JSX /> });
 *       return () => setPortal(null);
 *   }, [deps]);
 */
const PortalContext = createContext(null);

export function PortalProvider({ children }) {
    const [portal, setPortal] = useState(null);
    const location = useLocation();

    // Auto-clear portal when navigating away
    useEffect(() => {
        setPortal(null);
    }, [location.pathname]);

    return (
        <PortalContext.Provider value={{ portal, setPortal }}>
            {children}
        </PortalContext.Provider>
    );
}

export function usePortal() {
    const ctx = useContext(PortalContext);
    if (!ctx) throw new Error('usePortal must be used within a PortalProvider');
    return ctx;
}
