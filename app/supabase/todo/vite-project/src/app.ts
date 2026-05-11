import AuthManager from "./auth";
import UIManager from "./ui";
import { type Task } from "./types";
import { supabase } from "./supabaseClient";

const authManager = new AuthManager(supabase);
const uiManager = new UIManager();

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function setupAuthListeners(): void {
	document.getElementById("loginBtn")?.addEventListener("click", handleLogin);
	document.getElementById("loginEmail")?.addEventListener("keypress", (e) => {
		if ((e as KeyboardEvent).key === "Enter") handleLogin();
	});
	document.getElementById("loginPassword")?.addEventListener("keypress", (e) => {
		if ((e as KeyboardEvent).key === "Enter") handleLogin();
	});
	document.getElementById("registerBtn")?.addEventListener("click", handleRegister);
	document.getElementById("toggleRegister")?.addEventListener("click", (e) => {
		e.preventDefault();
		uiManager.showRegisterForm();
	});
	document.getElementById("toggleLogin")?.addEventListener("click", (e) => {
		e.preventDefault();
		uiManager.showLoginForm();
	});
	document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);
}

function setupAppListeners(): void {
	addBtn.addEventListener("click", handleAddTask);
	taskInput.addEventListener("keypress", (e) => {
		if ((e as KeyboardEvent).key === "Enter") handleAddTask();
	});
}

async function handleLogin(): Promise<void> {
	const { email, password } = uiManager.getLoginInputs();
	if (!email || !password) {
		uiManager.showError("Please enter email and password");
		return;
	}
	const { user, error } = await authManager.signIn(email, password);
	if (error) {
		uiManager.showError(error);
	} else if (user) {
		uiManager.clearAuthForms();
		uiManager.showAppScreen(user);
		await renderTask();
	}
}

async function handleRegister(): Promise<void> {
	const { email, password, passwordConfirm } = uiManager.getRegisterInputs();
	if (!email || !password || !passwordConfirm) {
		uiManager.showError("Please fill in all fields");
		return;
	}
	if (password !== passwordConfirm) {
		uiManager.showError("Passwords do not match");
		return;
	}
	const { user, error } = await authManager.signUp(email, password);
	if (error) {
		uiManager.showError(error);
	} else if (user) {
		uiManager.clearAuthForms();
		uiManager.showError("Registration successful! Please check your email to confirm.");
		uiManager.showLoginForm();
	}
}

async function handleLogout(): Promise<void> {
	const { error } = await authManager.signOut();
	if (error) {
		uiManager.showError(error);
	} else {
		uiManager.clearAuthForms();
		uiManager.showAuthScreen();
	}
}

async function handleAddTask(): Promise<void> {
	const user = authManager.getCurrentUser();
	if (!user) return;
	const text = taskInput.value.trim();
	if (!text) return;
	try {
		const { error } = await supabase.from("todos").insert({
			text,
			completed: false,
			user_id: user.id,
		});
		if (error) throw error;
		taskInput.value = "";
		await renderTask();
	} catch (error) {
		uiManager.showError(error instanceof Error ? error.message : "Failed to add task");
	}
}

async function fetchTask(): Promise<Task[]> {
	const user = authManager.getCurrentUser();
	if (!user) return [];
	try {
		const { data, error } = await supabase
			.from("todos")
			.select("*")
			.eq("user_id", user.id)
			.order("created_at", { ascending: true });
		if (error) throw error;
		return data as Task[];
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function renderTask(): Promise<void> {
	const tasks = await fetchTask();
	taskList.innerHTML = "";
	tasks.forEach((item) => {
		const li = document.createElement("li");
		const span = document.createElement("span");
		span.textContent = item.text + (item.completed ? " ✓" : "");
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.onclick = async () => {
			try {
				const { error } = await supabase.from("todos").delete().eq("id", item.id);
				if (error) throw error;
				await renderTask();
			} catch (error) {
				uiManager.showError(error instanceof Error ? error.message : "Failed to delete task");
			}
		};
		const completeBtn = document.createElement("button");
		completeBtn.textContent = item.completed ? "Undo" : "Complete";
		completeBtn.onclick = async () => {
			try {
				const { error } = await supabase
					.from("todos")
					.update({ completed: !item.completed })
					.eq("id", item.id);
				if (error) throw error;
				await renderTask();
			} catch (error) {
				uiManager.showError(error instanceof Error ? error.message : "Failed to update task");
			}
		};
		li.appendChild(span);
		li.appendChild(completeBtn);
		li.appendChild(deleteBtn);
		taskList.appendChild(li);
	});
}


async function init(): Promise<void> {
	setupAuthListeners();
	setupAppListeners();
	const user = await authManager.initSession();
	if (user) {
		uiManager.showAppScreen(user);
		await renderTask();
	} else {
		uiManager.showAuthScreen();
	}
}

init();
