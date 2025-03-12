// This file contains custom type declarations

// Declare the REACT_APP_MAPBOX_TOKEN environment variable
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MAPBOX_TOKEN: string;
  }
}

// Declare CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare image file formats
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif'; 