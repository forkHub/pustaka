export type UserType = {
	id: string;
	email: string;
	aud: string;
	role?: string;
	created_at: string;
}

export type AuthState = {
	user: UserType | null;
	isLoading: boolean;
	error: string | null;
}

export type Task = {
	id: number;
	text: string;
	completed: boolean;
	user_id?: string;
	created_at?: string;
}
