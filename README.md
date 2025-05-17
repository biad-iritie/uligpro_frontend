# UligPro Frontend

A modern, feature-rich web application built with React for managing and visualizing data with a beautiful user interface.

## 🚀 Features

- 📊 Interactive dashboards and data visualization
- 📅 Calendar and scheduling system
- 📱 Responsive design with RTL support
- 🔄 Real-time data updates
- 📄 PDF generation and export
- 📱 QR code generation and scanning
- 🎨 Modern UI with Material Design
- 🌐 Internationalization support
- 📈 Analytics integration
- 🔒 Secure authentication
- 📱 Mobile-first approach

## 🛠 Tech Stack

### Core Technologies
- **React** (v18.2.0) - Frontend framework
- **Node.js** (v18.12.1+) - Runtime environment
- **GraphQL** - API communication
- **Apollo Client** - GraphQL client
- **Redux Toolkit** - State management
- **React Router** - Navigation

### UI & Styling
- **Material-UI** - Component library
- **Styled Components** - CSS-in-JS
- **SASS** - CSS preprocessor
- **Emotion** - CSS-in-JS
- **React Spring** - Animations

### Data & Forms
- **React Hook Form** - Form handling
- **React Big Calendar** - Calendar functionality
- **Recharts** - Data visualization
- **React Grid Layout** - Layout management
- **@dnd-kit** - Drag and drop

### Additional Features
- **React PDF** - PDF generation
- **QR Scanner** - QR code functionality
- **React Toastify** - Notifications
- **React GA4** - Analytics
- **Swiper** - Carousel/Slider

## 🏗 Project Structure

```
src/
├── app/          # Core application logic
├── components/   # Reusable components
├── pages/        # Page components
├── features/     # Feature-specific code
├── hooks/        # Custom React hooks
├── utils/        # Utility functions
├── contexts/     # React context providers
├── styles/       # Global styles
├── assets/       # Static assets
├── widgets/      # Reusable widgets
├── constants/    # Application constants
├── ui/           # UI components
├── layout/       # Layout components
├── fonts/        # Custom fonts
└── styles/       # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.12.1 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd uligpro-frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```bash
REACT_APP_PUBLIC_GA=YOUR_GA_TRACKING_ID  # Optional: For Google Analytics
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run gzip` - Builds and compresses the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔧 Configuration

### Custom Icons
To modify the icon font:
1. Import `src/fonts/icomoon/selection.json` into [IcoMoon](https://icomoon.io/app)
2. Make your changes
3. Export and replace the existing files

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```bash
REACT_APP_PUBLIC_GA=YOUR_GA_TRACKING_ID
```

## 🧪 Development Guidelines

- Follow the established project structure
- Use TypeScript for new components
- Implement proper error handling
- Write meaningful commit messages
- Follow the component naming conventions
- Use the provided UI components from the component library
- Implement proper loading states
- Handle edge cases and error states

## 📦 Build & Deployment

### Production Build
```bash
npm run build
# or
yarn build
```

### Optimized Production Build (with compression)
```bash
npm run gzip
# or
yarn gzip
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- Frontend Development Team
- UI/UX Designers
- Product Managers

## 📞 Support

For support, please contact the development team or raise an issue in the repository.
