declare module 'react-map-gl/maplibre' {
  import * as React from 'react';
  
  export type ViewState = {
    longitude: number;
    latitude: number;
    zoom: number;
    bearing?: number;
    pitch?: number;
    padding?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };

  export type ViewStateChangeEvent = {
    viewState: ViewState;
    interactionState: any;
    oldViewState: ViewState;
  };

  export type MapRef = {
    getMap: () => maplibregl.Map;
    [key: string]: any;
  };

  export interface MapProps extends Omit<React.HTMLProps<HTMLDivElement>, 'style'> {
    mapboxAccessToken?: string;
    mapStyle?: string;
    onMove?: (evt: ViewStateChangeEvent) => void;
    onMoveStart?: (evt: ViewStateChangeEvent) => void;
    onMoveEnd?: (evt: ViewStateChangeEvent) => void;
    onZoom?: (evt: ViewStateChangeEvent) => void;
    onZoomStart?: (evt: ViewStateChangeEvent) => void;
    onZoomEnd?: (evt: ViewStateChangeEvent) => void;
    onRotate?: (evt: ViewStateChangeEvent) => void;
    onRotateStart?: (evt: ViewStateChangeEvent) => void;
    onRotateEnd?: (evt: ViewStateChangeEvent) => void;
    onDrag?: (evt: ViewStateChangeEvent) => void;
    onDragStart?: (evt: ViewStateChangeEvent) => void;
    onDragEnd?: (evt: ViewStateChangeEvent) => void;
    onLoad?: (evt: { target: maplibregl.Map }) => void;
    onClick?: (evt: { lngLat: [number, number]; features?: any[]; originalEvent: MouseEvent }) => void;
    style?: React.CSSProperties;
    cursor?: string;
    [key: string]: any;
  }

  export interface MarkerProps {
    longitude: number;
    latitude: number;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    offset?: [number, number];
    onClick?: (evt: { originalEvent: MouseEvent }) => void;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    draggable?: boolean;
    rotation?: number;
    rotationAlignment?: 'map' | 'viewport' | 'auto';
    pitchAlignment?: 'map' | 'viewport' | 'auto';
  }

  export interface PopupProps {
    longitude: number;
    latitude: number;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    offset?: number | [number, number] | { [key: string]: [number, number] };
    closeButton?: boolean;
    closeOnClick?: boolean;
    closeOnMove?: boolean;
    tipSize?: number;
    onClose?: () => void;
    className?: string;
    style?: React.CSSProperties;
    maxWidth?: string;
    children?: React.ReactNode;
  }

  export interface NavigationControlProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    style?: React.CSSProperties;
    className?: string;
    showCompass?: boolean;
    showZoom?: boolean;
    visualizePitch?: boolean;
  }

  export interface GeolocateControlProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    style?: React.CSSProperties;
    className?: string;
    positionOptions?: PositionOptions;
    fitBoundsOptions?: any;
    trackUserLocation?: boolean;
    showUserLocation?: boolean;
    showAccuracyCircle?: boolean;
    auto?: boolean;
  }

  export const Map: React.FC<MapProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Popup: React.FC<PopupProps>;
  export const NavigationControl: React.FC<NavigationControlProps>;
  export const GeolocateControl: React.FC<GeolocateControlProps>;

  export default Map;
} 