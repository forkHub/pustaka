import type { UserType } from "./types";

class UIManager {
	private authContainer: HTMLElement;
	private appContainer: HTMLElement;
	private loginForm: HTMLElement;
	private registerForm: HTMLElement;
	private userEmail: HTMLElement;

	constructor() {
		this.authContainer = document.getElementById("authContainer")!;
		this.appContainer = document.getElementById("appContainer")!;
		this.loginForm = document.getElementById("loginForm")!;
		this.registerForm = document.getElementById("registerForm")!;
		this.userEmail = document.getElementById("userEmail")!;
	}

	showAuthScreen(): void {
		this.authContainer.style.display = "block";
		this.appContainer.style.display = "none";
		this.showLoginForm();
	}

	showAppScreen(user: UserType): void {
		this.authContainer.style.display = "none";
		this.appContainer.style.display = "block";
		this.userEmail.textContent = user.email;
	}

	showLoginForm(): void {
		this.loginForm.style.display = "block";
		this.registerForm.style.display = "none";
	}

	showRegisterForm(): void {
		this.loginForm.style.display = "none";
		this.registerForm.style.display = "block";
	}

	getLoginInputs(): { email: string; password: string } {
		const email = (document.getElementById("loginEmail") as HTMLInputElement).value.trim();
		const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
		return { email, password };
	}

	getRegisterInputs(): { email: string; password: string; passwordConfirm: string } {
		const email = (document.getElementById("registerEmail") as HTMLInputElement).value.trim();
		const password = (document.getElementById("registerPassword") as HTMLInputElement).value;
		const passwordConfirm = (document.getElementById("registerPasswordConfirm") as HTMLInputElement).value;
		return { email, password, passwordConfirm };
	}

	clearAuthForms(): void {
		(document.getElementById("loginEmail") as HTMLInputElement).value = "";
		(document.getElementById("loginPassword") as HTMLInputElement).value = "";
		(document.getElementById("registerEmail") as HTMLInputElement).value = "";
		(document.getElementById("registerPassword") as HTMLInputElement).value = "";
		(document.getElementById("registerPasswordConfirm") as HTMLInputElement).value = "";
	}

	showError(message: string): void {
		alert(`Error: ${message}`); // Replace with better error UI later
	}
}

export default UIManager;
