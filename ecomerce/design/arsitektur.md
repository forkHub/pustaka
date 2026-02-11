## 🛠️ Development Process Breakdown

### 1. **Project Setup**

- Install Laravel 12 and configure environment (`.env` for DB, mail, etc.).
- Set up database (MySQL/PostgreSQL).
- Configure routing, controllers, and Blade templates (or Inertia/Vue if you want SPA).

---

### 2. **Database Design**

Since you have **100 sellers** and each can sell **10 items**, the schema can be minimal:

**Tables:**

- **Sellers**
  - `id`, `name`, `phone_number` (for WhatsApp contact), `status`
- **Items**
  - `id`, `seller_id`, `title`, `description`, `price`, `image_url`, `availability`
- **Transactions (optional logging)**
  - `id`, `item_id`, `buyer_contact` (WhatsApp number), `status`

👉 No need for customer accounts or categories.

---

### 3. **Seller Management**

- Admin panel to register/manage sellers (since no customer registration).
- Limit seller items to **10 max** via validation rules.
- CRUD for items (create, update, delete).

---

### 4. **Item Display**

- Public marketplace page showing all items.
- Simple search/filter (by item name or seller).
- Item detail page with:
  - Title, description, price, image
  - **“Contact Seller via WhatsApp” button** → opens WhatsApp chat with pre-filled message.

---

### 5. **WhatsApp Transaction Flow**

- Use WhatsApp API deep link:  
  `https://wa.me/{seller_phone}?text=Hello, I'm interested in {item_name}`
- No in-app checkout; transaction handled externally in WhatsApp.
- Optional: log transaction intent in DB for analytics.

---

### 6. **Admin Features**

- Dashboard for marketplace owner:
  - Manage sellers and items.
  - Monitor item availability.
  - View transaction logs (optional).

---

### 7. **UI/UX**

- Keep it simple: grid/list of items.
- Minimal navigation (Home → Items → Item Detail → WhatsApp).
- Responsive design for mobile-first (since WhatsApp is mobile-heavy).

---

### 8. **Deployment**

- Host on shared/VPS server (Laravel Forge, DigitalOcean, etc.).
- Configure caching (Redis) for performance.
- Use Laravel’s queue system if you want background logging.

---

### 9. **Future Enhancements (Optional)**

- Add item stock tracking.
- Add seller verification.
- Add analytics dashboard (sales, clicks).
- Add multilingual support (Indonesian/English).

---

## ⚡ Development Timeline (Lean MVP)

- **Week 1:** Setup Laravel, DB schema, seller CRUD.
- **Week 2:** Item CRUD, public marketplace UI.
- **Week 3:** WhatsApp integration, transaction logging.
- **Week 4:** Admin dashboard, testing, deployment.

---

## 📐 Database Schema

### **Table: sellers**

| Column         | Type         | Notes                             |
| -------------- | ------------ | --------------------------------- |
| `id`           | BIGINT PK    | Auto-increment primary key        |
| `name`         | VARCHAR(100) | Seller’s display name             |
| `phone_number` | VARCHAR(20)  | WhatsApp contact number           |
| `email`        | VARCHAR(100) | Optional, for admin communication |
| `status`       | ENUM         | `active`, `inactive`              |
| `created_at`   | TIMESTAMP    | Laravel default                   |
| `updated_at`   | TIMESTAMP    | Laravel default                   |

---

### **Table: items**

| Column         | Type          | Notes                              |
| -------------- | ------------- | ---------------------------------- |
| `id`           | BIGINT PK     | Auto-increment primary key         |
| `seller_id`    | BIGINT FK     | References `sellers.id`            |
| `title`        | VARCHAR(150)  | Item name                          |
| `description`  | TEXT          | Item details                       |
| `price`        | DECIMAL(10,2) | Item price                         |
| `image_url`    | VARCHAR(255)  | Path/URL to item image             |
| `availability` | BOOLEAN       | `true` = available, `false` = sold |
| `created_at`   | TIMESTAMP     | Laravel default                    |
| `updated_at`   | TIMESTAMP     | Laravel default                    |

👉 Validation rule: **Max 10 items per seller** enforced at application level.

---

### **Table: transactions (optional logging)**

| Column          | Type        | Notes                                 |
| --------------- | ----------- | ------------------------------------- |
| `id`            | BIGINT PK   | Auto-increment primary key            |
| `item_id`       | BIGINT FK   | References `items.id`                 |
| `buyer_contact` | VARCHAR(20) | Buyer’s WhatsApp number (optional)    |
| `status`        | ENUM        | `initiated`, `completed`, `cancelled` |
| `created_at`    | TIMESTAMP   | Laravel default                       |
| `updated_at`    | TIMESTAMP   | Laravel default                       |

---

## 🔗 Relationships

- **One seller → many items** (`sellers.id` → `items.seller_id`)
- **One item → many transactions** (`items.id` → `transactions.item_id`)

---

## 📝 Notes

- No customer table (buyers are anonymous, only WhatsApp contact logged if needed).
- No categories table (flat item listing).
- Admin panel manages sellers and items.
- WhatsApp deep link handles checkout:  
  `https://wa.me/{seller_phone}?text=Interested in {item_name}`

## 📄 Pages Needed (with Seller Registration)

### Public

1. **Home / Marketplace Page** → list all items.
2. **Item Detail Page** → item info + WhatsApp button.
3. **Seller Registration Page** → form for new sellers.
4. **Seller Login Page** → login form.

### Seller Area

5. **Seller Dashboard** → overview of items.
6. **Item List Page** → seller’s items.
7. **Item Create/Edit Page** → add/edit item.
8. **Seller Profile Page** → update info.

### Admin Area

9. **Admin Login Page**
10. **Admin Dashboard**
11. **Seller Management Page** (list, approve, deactivate)
12. **Item Management Page** (view/edit/delete items)
13. **Transaction Log Page** (optional)

## Site map:

```
Public
 ├── Home / Marketplace
 │    └── Item Detail
 ├── Seller Registration
 └── Seller Login

Seller (authenticated)
 ├── Dashboard
 ├── Item Management
 │    ├── Item List
 │    ├── Item Create
 │    ├── Item Edit
 │    └── Item Delete
 └── Profile

Admin (authenticated)
 ├── Dashboard
 ├── Seller Management
 │    ├── Seller List
 │    └── Seller Detail
 ├── Item Management
 │    └── Item List / Edit / Delete
 └── Transaction Log (optional)
```
