import { createClient } from "@supabase/supabase-js";

type Task = {
	id: number;
	text: string;
	completed: boolean;
}

const VITE_SUPABASE_URL = `https://punaxsascwdlitkynfnd.supabase.co`
const VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY = 'sb_publishable_eca4ZMXgyqczd05MOpTUkw_iOLMtdZp'

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

async function fetchTask(): Promise<Task[]> {
	const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: true });

	if (error) {
		console.error(error);
		return [];
	}

	return data as Task[];
}

addBtn.onclick = async () => {
	const text = taskInput.value.trim();
	if (!text) return;

	await supabase.from("todos").insert({
		text: text,
		completed: false
	});

	taskInput.value = "";
	renderTask();
}

async function renderTask() {
	const task = await fetchTask();
	taskList.innerHTML = '';

	task.forEach((item) => {
		const li = document.createElement('li');
		const span = document.createElement('span');
		span.textContent = item.text + (item.completed ? " complete " : " - ");

		span.onclick = async () => {
			await supabase.from("todos").update({
				completed:
					!item.completed
			});
			await renderTask();
		}

		li.appendChild(span);
		taskList.appendChild(li);
	})
}

renderTask();
