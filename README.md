# BeachSafe

BeachSafe is a modern web application that provides real-time beach conditions, safety alerts, and interactive maps to help users enjoy beaches safely.

![BeachSafe Screenshot](https://via.placeholder.com/800x400?text=BeachSafe+Screenshot)

## Features

- **Interactive Beach Map**: Color-coded map showing safety levels (green, yellow, red) for beaches
- **Real-time Alerts**: Notifications about tsunami warnings, high waves, and other critical beach conditions
- **Safety Information**: Comprehensive safety tips, lifeguard availability, and emergency contact information
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - React Router v6
  - Framer Motion (animations)
  - Tailwind CSS (styling)
  - React Map GL with MapLibre (map visualization)
  - React Icons

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or Atlas connection)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ApurvaBardapurkar/beach.git
   cd beach/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/beachsafe
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
beach/
├── frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main App component
│   │   └── index.tsx        # Entry point
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js backend
│   ├── src/                 # Source files
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Entry point
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

## API Endpoints

### Beaches

- `GET /api/beaches` - Get all beaches
- `GET /api/beaches/:id` - Get beach by ID
- `POST /api/beaches` - Create a new beach
- `PUT /api/beaches/:id` - Update a beach
- `DELETE /api/beaches/:id` - Delete a beach

### Alerts

- `GET /api/alerts` - Get all active alerts
- `GET /api/alerts/:id` - Get alert by ID
- `POST /api/alerts` - Create a new alert
- `PUT /api/alerts/:id` - Update an alert
- `DELETE /api/alerts/:id` - Delete an alert

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Map GL](https://visgl.github.io/react-map-gl/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/) 