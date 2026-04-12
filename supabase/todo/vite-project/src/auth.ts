import { SupabaseClient, type User as SupabaseUser } from "@supabase/supabase-js";
import type { UserType, AuthState } from "./types";


class AuthManager {
	private supabase: SupabaseClient;
	private state: AuthState = {
		user: null,
		isLoading: true,
		error: null,
	};

	constructor(supabaseClient: SupabaseClient) {
		this.supabase = supabaseClient;
	}

	async initSession(): Promise<UserType | null> {
		try {
			const { data: { session }, error } = await this.supabase.auth.getSession();
			if (error) throw error;
			if (session?.user) {
				this.state.user = this.mapSupabaseUserToUser(session.user);
				this.state.error = null;
			}
			return this.state.user;
		} catch (error) {
			this.state.error = error instanceof Error ? error.message : "Session error";
			return null;
		} finally {
			this.state.isLoading = false;
		}
	}

	async signUp(email: string, password: string): Promise<{ user: UserType | null; error: string | null }> {
		try {
			this.state.isLoading = true;
			const { data: { user }, error } = await this.supabase.auth.signUp({ email, password });
			if (error) throw error;
			if (!user) throw new Error("User creation failed");
			this.state.user = this.mapSupabaseUserToUser(user);
			this.state.error = null;
			return { user: this.state.user, error: null };
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : "Sign up failed";
			this.state.error = errorMsg;
			return { user: null, error: errorMsg };
		} finally {
			this.state.isLoading = false;
		}
	}

	async signIn(email: string, password: string): Promise<{ user: UserType | null; error: string | null }> {
		try {
			this.state.isLoading = true;
			const { data: { user }, error } = await this.supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
			if (!user) throw new Error("Sign in failed");
			this.state.user = this.mapSupabaseUserToUser(user);
			this.state.error = null;
			return { user: this.state.user, error: null };
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : "Sign in failed";
			this.state.error = errorMsg;
			return { user: null, error: errorMsg };
		} finally {
			this.state.isLoading = false;
		}
	}

	async signOut(): Promise<{ error: string | null }> {
		try {
			const { error } = await this.supabase.auth.signOut();
			if (error) throw error;
			this.state.user = null;
			this.state.error = null;
			return { error: null };
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : "Sign out failed";
			this.state.error = errorMsg;
			return { error: errorMsg };
		}
	}

	onAuthStateChange(callback: (user: UserType | null) => void): () => void {
		const { data: { subscription } } = this.supabase.auth.onAuthStateChange(
			async (event, session) => {
				if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
					this.state.user = session?.user
						? this.mapSupabaseUserToUser(session.user)
						: null;
				} else if (event === "SIGNED_OUT") {
					this.state.user = null;
				}
				callback(this.state.user);
			}
		);
		return () => subscription?.unsubscribe();
	}

	getState(): AuthState {
		return this.state;
	}

	getCurrentUser(): UserType | null {
		return this.state.user;
	}

	private mapSupabaseUserToUser(supabaseUser: SupabaseUser): UserType {
		return {
			id: supabaseUser.id,
			email: supabaseUser.email || "",
			aud: supabaseUser.aud || "",
			role: supabaseUser.role,
			created_at: supabaseUser.created_at || "",
		};
	}

	getSupabaseClient(): SupabaseClient {
		return this.supabase;
	}
}

export default AuthManager;
