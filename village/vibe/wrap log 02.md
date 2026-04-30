Good question — **multiple toasts are very common**, so it’s important to understand what actually happens and how to control it.

Below is a **clear breakdown of the behavior**, followed by **best‑practice solutions**.

***

## ✅ What happens when multiple toasts are fired?

### 1️⃣ They **stack visually**

Every call to `showToast()` creates a new `<div>` and appends it to the container.

```txt
[ Toast 1 ]
[ Toast 2 ]
[ Toast 3 ]
```

Because your container uses:

```css
display: flex;
flex-direction: column;
gap: 8px;
```

✅ **Each toast**

*   appears as a separate element
*   stacks vertically
*   animates independently
*   has its own timeout

***

### 2️⃣ Each toast has its **own lifecycle**

Each call sets its own timer:

```js
setTimeout(() => toast.remove(), duration);
```

So:

*   Toast A disappears after 3s
*   Toast B (triggered later) disappears after *its* 3s

✅ They **do not block or reset** each other by default.

***

### 3️⃣ If many logs fire quickly…

Example:

```js
for (let i = 0; i < 20; i++) {
  console.log("Log", i);
}
```

You’ll get:

*   ✅ 20 toasts created instantly
*   ❌ Screen clutter
*   ❌ Possible performance / UX issues

This is normal behavior unless you add control logic.

***

## ⚠️ Common problems with uncontrolled toasts

| Problem         | Why it happens               |
| --------------- | ---------------------------- |
| Toast flood     | Every log creates a toast    |
| Overlapping     | Container runs out of space  |
| Annoying UX     | User can’t read fast enough  |
| Memory pressure | Many DOM nodes briefly alive |

***

## ✅ Best practices to handle multiple toasts

### ✅ 1. **Limit max visible toasts** (Most common)

```js
const MAX_TOASTS = 5;

function showToast(message, type = "log", duration = 3000) {
  const container = document.getElementById("toast-container");

  if (container.children.length >= MAX_TOASTS) {
    container.firstChild.remove(); // remove oldest
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), duration);
}
```

✅ Prevents flooding  
✅ Keeps UI tidy

***

### ✅ 2. **Deduplicate identical messages**

```js
const activeMessages = new Set();

function showToast(message, type = "log", duration = 3000) {
  if (activeMessages.has(message)) return;

  activeMessages.add(message);

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast ${type}`;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => {
    activeMessages.delete(message);
    toast.remove();
  }, duration);
}
```

✅ Same message won’t spam  
✅ Useful for validation errors

***

### ✅ 3. **Queue toasts (one at a time)**

```js
let queue = [];
let showing = false;

function showToast(message, type = "log", duration = 3000) {
  queue.push({ message, type, duration });
  processQueue();
}

function processQueue() {
  if (showing || queue.length === 0) return;

  showing = true;
  const { message, type, duration } = queue.shift();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => {
    toast.remove();
    showing = false;
    processQueue();
  }, duration);
}
```

✅ No overlap  
✅ Best readability  
❌ Slower feedback for burst logs

***

### ✅ 4. **Group logs instead of showing many**

Instead of:

```js
console.log("Retrying...");
```

Show:

```js
console.log("Retrying… (5 times)");
```

✅ Better UX  
✅ Fewer toasts

***

## ✅ Recommended default behavior (industry standard)

Most toast libraries (Toastify, Notyf, Sonner):

✅ Stack vertically  
✅ Cap max toasts (3–5)  
✅ Auto-dismiss  
✅ Smooth fade-out  
✅ Deduplicate when possible

Your implementation should follow the same logic.

***

## ✅ TL;DR

*   ✅ Multiple toasts → **they stack**
*   ✅ Each toast has its **own timer**
*   ❌ Without limits → UI spam
*   ✅ Best solution → **limit + auto-dismiss**
*   ✅ Advanced → queue or deduplicate

***

If you want, I can:

*   add progress bars ⏳
*   collapse logs into “+5 more”
*   pause on hover
*   build a **production-grade toast manager**

Just tell me 👍
