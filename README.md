# 🎥 Video App

A YouTube-like video platform built with a Laravel backend and a React (Vite) + Redux Toolkit frontend. Users can browse videos, view details, and post comments in real-time.

## 🚀 Features

- User authentication (login/register)
- Token-based auth using Laravel Sanctum
- Video listing and detail pages
- Post and view comments on videos
- Persistent login state via Redux Toolkit + localStorage
- Responsive UI built with Tailwind CSS and shadcn/ui

## 🛠 Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS, shadcn/ui
- **Backend**: Laravel (API only)
- **Auth**: Laravel Sanctum, Axios
- **Other**: Inertia (initially), now decoupled SPA architecture

## 📦 Installation

### 1. Backend (Laravel API)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
