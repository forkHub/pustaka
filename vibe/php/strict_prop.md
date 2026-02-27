Yes! Since **PHP 7.4**, classes support **typed properties**, which means you can declare the type of a property and PHP will enforce it at runtime. This is similar to strict typing for function parameters and return types.

***

### ✅ Example: Typed Properties in a Class

```php
<?php declare(strict_types=1);

class User
{
    public int $id;           // must be an integer
    public string $name;      // must be a string
    public ?string $email;    // nullable string
    public DateTime $created; // must be a DateTime object
}

$user = new User();
$user->id = 123;             // ✅ OK
$user->name = "Fajar";       // ✅ OK
$user->email = null;         // ✅ OK
$user->created = new DateTime(); // ✅ OK

$user->id = "123";           // ❌ TypeError (string given, int expected)
```

***

### ✅ Key Points

*   Works for **scalar types** (`int`, `string`, `float`, `bool`) and **class/interface types**.
*   Supports **nullable types** using `?Type`.
*   Enforced **at runtime** (not compile-time).
*   Combined with `declare(strict_types=1)`, you get strict checks for:
    *   Function parameters and return types.
    *   Property assignments.

***

### ✅ Best Practices for Large Apps

*   Use **typed properties** for all domain entities and DTOs.
*   Combine with **readonly** (PHP 8.1+) for immutability:
    ```php
    public readonly string $name;
    ```
*   Use **constructor property promotion** for cleaner code:
    ```php
    class Product {
        public function __construct(
            public readonly int $id,
            public readonly string $name
        ) {}
    }
    ```

***

Do you want me to **show you a full example of a class with strict typing for properties, constructor, and methods (including nullable and union types)**? Or should I also include **how to enforce this across your entire codebase using tools like PHPStan and Rector**?
