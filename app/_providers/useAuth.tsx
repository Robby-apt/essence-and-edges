'use client';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
	session: any;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	session: null,
	loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data?.session ?? null);
			setLoading(false);
		});

		const { data: subscriptionData } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				// callback receives (event, session)
				setSession(session ?? null);
			}
		);

		return () => {
			subscriptionData?.subscription?.unsubscribe?.();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
