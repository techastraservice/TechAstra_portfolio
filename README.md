# 🚀 TechAstra Portfolio

Official portfolio website for **TechAstra** — expert consultancy and project development services.

🔗 **Live Site**: [techastra-14e42.web.app](https://techastra-14e42.web.app)

---

## ✨ Features

- **3D Interactive Background** — Immersive Three.js animated background
- **Dynamic Projects Showcase** — Firebase-powered project gallery with modals
- **Services & Pricing** — Detailed service listings with pricing modal
- **Testimonials & Feedback** — Public feedback submission with real-time display
- **Team Section** — Team member profiles with LinkedIn integration
- **Contact Form** — Integrated contact form with email notifications
- **Blog Preview** — Blog section with article previews
- **Admin Dashboard** — Full-featured admin panel with:
  - Project, Team & Resource management
  - Analytics & System logs (via Recharts)
  - Firebase Storage image uploads
  - Nested folder creation for resources
- **Dark/Light Theme** — Toggle between themes via ThemeContext
- **Responsive Design** — Fully responsive across all devices
- **SEO Optimized** — Proper meta tags and semantic HTML

---

## 🛠️ Tech Stack

| Category       | Technology                                      |
| -------------- | ----------------------------------------------- |
| **Framework**  | React 19 + Vite (Rolldown)                      |
| **Styling**    | Tailwind CSS 3                                  |
| **3D Graphics**| Three.js, React Three Fiber, Drei               |
| **Backend**    | Firebase (Firestore, Auth, Storage, Hosting)     |
| **Charts**     | Recharts                                        |
| **Routing**    | React Router DOM v7                             |
| **Icons**      | Lucide React                                    |
| **PDF Export** | jsPDF + html2canvas                             |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard sub-components
│   ├── Hero.jsx        # Landing hero section
│   ├── About.jsx       # About section
│   ├── Services.jsx    # Services listing
│   ├── Projects.jsx    # Project showcase
│   ├── Testimonials.jsx# Testimonials & feedback
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer with contact modal
│   ├── Navbar.jsx      # Navigation bar
│   ├── Admin.jsx       # Admin dashboard
│   ├── Background3D.jsx# 3D animated background
│   └── ...             # Modals & utilities
├── context/
│   ├── ThemeContext.jsx # Dark/Light theme provider
│   ├── ProjectContext.jsx # Project data provider
│   └── TeamContext.jsx # Team data provider
├── utils/              # Utility functions
├── data/               # Static data
├── assets/             # Images & media
├── firebaseConfig.js   # Firebase configuration
└── App.jsx             # Root application component
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+
- **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/techastraservice/TechAstra_portfolio.git

# Navigate to the project
cd TechAstra_portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## 🌐 Deployment

This project is deployed on **Firebase Hosting**.

```bash
# Deploy to Firebase
firebase deploy
```

**Live Site**: [https://techastra-14e42.web.app](https://techastra-14e42.web.app)

---

## 🔧 Environment Setup

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 📄 License

This project is proprietary to **TechAstra**.

---

<p align="center">Made with ❤️ by <strong>TechAstra</strong></p>
