# Portfolio Site

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🛠️ Built With

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS post-processor

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.jsx          # Navigation component
│   └── sections/           # Page sections
│       ├── About.jsx       # About section
│       ├── Projects.jsx    # Projects showcase
│       └── Contact.jsx     # Contact information
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles with Tailwind
```

## 🎨 Customization

### Personal Information
- Update your name in `src/App.jsx` (hero section)
- Modify contact details in `src/components/sections/Contact.jsx`
- Add your projects in `src/components/sections/Projects.jsx`
- Update your bio in `src/components/sections/About.jsx`

### Styling
- Tailwind classes can be customized in `tailwind.config.js`
- Global styles can be added to `src/index.css`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 Notes

- The site is fully responsive and mobile-friendly
- Smooth scrolling navigation between sections
- Modern gradient hero section
- Clean project cards with technology tags
- Contact section with social links
