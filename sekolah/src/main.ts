import { supabase } from "./supabase";

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoList = document.getElementById("todoList")!;
const btnAdd = document.getElementById("btnAdd")!;
const btnLogout = document.getElementById("btnLogout")!;

let user: any = null;

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  user = data.session?.user;

  if (!user) {
    window.location.href = "auth.html";
  } else {
    loadTodos();
  }
}

async function loadTodos() {
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: true });

  renderTodos(data || []);
}

function renderTodos(todos: any[]) {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${todo.is_done ? "checked" : ""} data-id="${todo.id}">
      ${todo.title}
      <button data-del="${todo.id}">Hapus</button>
    `;
    todoList.appendChild(li);
  });

  todoList.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", toggleTodo);
  });

  todoList.querySelectorAll("button[data-del]").forEach(btn => {
    btn.addEventListener("click", deleteTodo);
  });
}

async function addTodo() {
  if (!todoInput.value) return;

  await supabase.from("todos").insert({
    title: todoInput.value,
    user_id: user.id,
  });

  todoInput.value = "";
  loadTodos();
}

async function toggleTodo(e: Event) {
  const el = e.target as HTMLInputElement;
  const id = el.dataset.id;

  await supabase.from("todos")
    .update({ is_done: el.checked })
    .eq("id", id);

  loadTodos();
}

async function deleteTodo(e: Event) {
  const id = (e.target as HTMLElement).dataset.del;

  await supabase.from("todos")
    .delete()
    .eq("id", id);

  loadTodos();
}

btnAdd.onclick = addTodo;

btnLogout.onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = "auth.html";
};

checkSession();