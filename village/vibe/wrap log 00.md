You can **wrap / override `console.log`** so every log message is also rendered in the browser as a `<div>`.

Below are **clean, safe patterns**, from simplest to more advanced.

***

## ✅ Basic setup: log to console **and** page

### HTML



### CSS (optional)

```css
#log {
  font-family: monospace;
}
.log-line {
  padding: 4px 6px;
  border-bottom: 1px solid #eee;
}
```

### JavaScript

```js
(function () {
  const originalLog = console.log;
  const container = document.getElementById("log");

  console.log = function (...args) {
    // 1. Call original console.log
    originalLog.apply(console, args);

    // 2. Create a DOM element
    const div = document.createElement("div");
    div.className = "log-line";
    div.textContent = args
      .map(a => typeof a === "object" ? JSON.stringify(a) : String(a))
      .join(" ");

    // 3. Append to page
    container.appendChild(div);
  };
})();
```

✅ Each `console.log()` → **one `<div>`**

***

## ✅ Result

```js
console.log("Hello");
console.log("User:", { id: 1, name: "Fajar" });
```

Renders as:



***

## ✅ Adding levels (log / warn / error)

```js
function wrapConsole(method, className) {
  const original = console[method];
  const container = document.getElementById("log");

  console[method] = (...args) => {
    original.apply(console, args);

    const div = document.createElement("div");
    div.className = `log-line ${className}`;
    div.textContent = args.join(" ");
    container.appendChild(div);
  };
}

wrapConsole("log", "log-info");
wrapConsole("warn", "log-warn");
wrapConsole("error", "log-error");
```

### CSS

```css
.log-warn { color: orange; }
.log-error { color: red; }
```

***

## ✅ Handling complex objects better

Instead of `JSON.stringify` everything:

```js
div.textContent = args.map(a => {
  if (typeof a === "object") {
    return console.dir ? JSON.stringify(a, null, 2) : String(a);
  }
  return String(a);
}).join(" ");
```

***

## ✅ Bonus: Auto-scroll

```js
container.scrollTop = container.scrollHeight;
```

***

## ⚠️ Notes / Best practices

*   ✅ Always keep `originalLog` (never replace permanently without it)
*   ⚠️ This affects **all logs globally**
*   🚫 Avoid in production unless explicitly intended
*   ✅ Ideal for debugging dashboards, demos, sandbox apps

***

If you want:

*   grouping (`console.group`)
*   timestamps
*   colored JSON tree output
*   React/Vue version

Just say the word 👍
