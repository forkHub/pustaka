Excellent — let’s sketch the **Eloquent models and relationships** for your Laravel marketplace app. This ties together the database schema, routes, and controllers we’ve already mapped.

---

## 📦 Models Overview

### 1. **Seller Model**

```php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seller extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'password',
        'status',
    ];

    // Relationships
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
```

- Extends `Authenticatable` because sellers can log in.
- One seller → many items.

---

### 2. **Item Model**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'title',
        'description',
        'price',
        'image_url',
        'availability',
    ];

    // Relationships
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
```

- Belongs to a seller.
- Can have many transaction logs.

---

### 3. **Transaction Model (Optional)**

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'buyer_contact',
        'status',
    ];

    // Relationships
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
```

- Belongs to an item.
- Used for logging WhatsApp inquiries.

---

### 4. **Admin Model**

```php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
```

- Separate guard for admin authentication.
- No direct relationships needed (admin oversees everything).

---

## 🔗 Relationships Summary

- **Seller → Items**: `hasMany`
- **Item → Seller**: `belongsTo`
- **Item → Transactions**: `hasMany`
- **Transaction → Item**: `belongsTo`

---

## 🧩 How It All Connects

- **Public**: MarketplaceController pulls `Item::with('seller')`.
- **Seller**: SellerItemController manages `Item` via `auth()->user()->items()`.
- **Admin**: AdminSellerController and AdminItemController query across all sellers/items.
- **Transactions**: Logged when a buyer clicks “Contact via WhatsApp.”

---

👉 With this, you now have **routes, controllers, models, and relationships** fully mapped.

Would you like me to **sketch the Laravel guards and middleware setup** (so Seller and Admin have separate logins)? That’s the last piece to make authentication clean.
