Great call—adding auth is the **most important upgrade** 🔐
We’ll keep it simple: **email + password login with Supabase Auth**, then tie todos to users.

---

# 🧠 What we’re adding

Using Supabase Auth:

* Sign up / login
* Get current user
* Save todos **per user**
* Secure with RLS

---

# 🧱 1. Update your database

Run this in SQL editor:

```sql
alter table todos add column user_id uuid references auth.users(id);

-- Enable RLS
alter table todos enable row level security;

-- Only allow users to access their own todos
create policy "Users can access own todos"
on todos
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

👉 This is critical: each todo now belongs to a user

---

# 🧩 2. Add Auth UI (HTML)

Update your `index.html`:

```html
<div id="auth">
  <h2>Login / Signup</h2>
  <input id="email" type="email" placeholder="Email" />
  <input id="password" type="password" placeholder="Password" />
  <button id="signupBtn">Sign Up</button>
  <button id="loginBtn">Login</button>
</div>

<div id="app" style="display:none;">
  <button id="logoutBtn">Logout</button>

  <div class="input-group">
    <input id="taskInput" type="text" placeholder="Enter a task..." />
    <button id="addBtn">Add</button>
  </div>

  <ul id="taskList"></ul>
</div>
```

---

# ⚙️ 3. Update `main.ts`

Here’s the upgraded version (auth + todos):

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_URL", "YOUR_KEY");

// Elements
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

const authDiv = document.getElementById("auth")!;
const appDiv = document.getElementById("app")!;

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

// ---------- AUTH ----------

// Sign up
signupBtn.onclick = async () => {
  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) alert(error.message);
  else alert("Check your email!");
};

// Login
loginBtn.onclick = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) alert(error.message);
};

// Logout
logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
};

// Listen to auth state
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";
    renderTasks();
  } else {
    authDiv.style.display = "block";
    appDiv.style.display = "none";
  }
});

// ---------- TODOS ----------

// Fetch tasks (only user's, thanks to RLS)
async function fetchTasks() {
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("created_at");

  return data || [];
}

// Render
async function renderTasks() {
  const tasks = await fetchTasks();
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    span.onclick = async () => {
      await supabase
        .from("todos")
        .update({ completed: !task.completed })
        .eq("id", task.id);

      renderTasks();
    };

    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = async () => {
      await supabase.from("todos").delete().eq("id", task.id);
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

// Add task
addBtn.onclick = async () => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;

  await supabase.from("todos").insert({
    text: taskInput.value,
    completed: false,
    user_id: user.id,
  });

  taskInput.value = "";
  renderTasks();
};
```

---

# 🔐 4. Enable Email Auth

In Supabase dashboard:

* Go to **Authentication → Providers**
* Enable **Email**

---

# ✅ What you now have

* 🔑 Login / Signup
* 👤 User sessions
* 🔒 Each user sees only their todos
* ☁️ Data stored in Supabase

---

# ⚠️ Common gotchas

* You must confirm email (unless disabled)
* RLS must be enabled (or queries fail silently)
* Always include `user_id` when inserting

---

# 🚀 Next level upgrades

If you want to go further:

* ✨ Magic link (passwordless login)
* 🔄 Realtime todos (auto update UI)
* 📱 Better UI (loading states, errors)
* 🌍 Deploy (Vercel)

---

If you want, I can next:
👉 simplify this into a cleaner architecture
👉 or convert it to React (much nicer for auth state)

Just say 👍
