# Troubleshooting Guide

## PostCSS Plugin Issues

If you encounter errors related to PostCSS plugins when starting the frontend application, such as:

```
Failed to compile.
Loading PostCSS "postcss-flexbugs-fixes" plugin failed: Cannot find module 'postcss-flexbugs-fixes'
```

Install the missing PostCSS plugins by running:

```bash
cd BEACH/frontend
npm install postcss-flexbugs-fixes postcss-preset-env --save-dev
```

## TypeScript Errors with React Icons

If you encounter TypeScript errors related to `IconType` from react-icons, ensure you're using the `IconWrapper` component that was created to handle these issues:

```tsx
import { IconWrapper } from '../components/IconWrapper';

// Use the IconWrapper component with type casting
<IconWrapper icon={FaWater as any} className="text-ocean-blue" />
```

## MapLibre GL Issues

If you encounter issues with MapLibre GL:

1. Make sure you have installed the required dependencies:

```bash
npm install maplibre-gl
```

2. Check that your imports are correct in the BeachMap component:

```tsx
import Map from 'react-map-gl/maplibre';
import { 
  Marker, 
  Popup, 
  NavigationControl, 
  GeolocateControl
} from 'react-map-gl/maplibre';
```

3. Ensure you have a valid Mapbox token in your environment variables:

```
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

## Missing Dependencies

If you encounter other missing dependencies, install them using npm:

```bash
npm install <package-name>
```

For example, to install Tailwind CSS and its dependencies:

```bash
npm install tailwindcss postcss autoprefixer
```

## Running the Application

To start the frontend application:

```bash
cd BEACH/frontend
npm start
```

To start the backend application:

```bash
cd BEACH/backend
npm start
```

## Environment Variables

Make sure you have the necessary environment variables set up:

### Frontend (.env file in the frontend directory)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

### Backend (.env file in the backend directory)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/beachsafe
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
``` 