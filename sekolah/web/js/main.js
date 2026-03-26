var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "./supabase";
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const btnAdd = document.getElementById("btnAdd");
const btnLogout = document.getElementById("btnLogout");
let user = null;
function checkSession() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield supabase.auth.getSession();
        user = (_a = data.session) === null || _a === void 0 ? void 0 : _a.user;
        if (!user) {
            window.location.href = "auth.html";
        }
        else {
            loadTodos();
        }
    });
}
function loadTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield supabase
            .from("todos")
            .select("*")
            .order("id", { ascending: true });
        renderTodos(data || []);
    });
}
function renderTodos(todos) {
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
function addTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!todoInput.value)
            return;
        yield supabase.from("todos").insert({
            title: todoInput.value,
            user_id: user.id,
        });
        todoInput.value = "";
        loadTodos();
    });
}
function toggleTodo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const el = e.target;
        const id = el.dataset.id;
        yield supabase.from("todos")
            .update({ is_done: el.checked })
            .eq("id", id);
        loadTodos();
    });
}
function deleteTodo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = e.target.dataset.del;
        yield supabase.from("todos")
            .delete()
            .eq("id", id);
        loadTodos();
    });
}
btnAdd.onclick = addTodo;
btnLogout.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    yield supabase.auth.signOut();
    window.location.href = "auth.html";
});
checkSession();
