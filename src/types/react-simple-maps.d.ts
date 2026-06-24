declare module "react-simple-maps" {
  import { ComponentProps, ReactNode, CSSProperties } from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (pos: { coordinates: [number, number]; zoom: number }) => void;
    onMove?: (pos: { x: number; y: number; zoom: number }) => void;
    onMoveEnd?: (pos: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }
  export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element;

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }
  export function Geographies(props: GeographiesProps): JSX.Element;

  export interface Geography {
    rsmKey: string;
    type: string;
    properties: {
      NAME?: string;
      ISO_A2?: string;
      ISO_A3?: string;
      [key: string]: any;
    };
    geometry: object;
  }

  export interface GeographyProps {
    geography: Geography;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onMouseEnter?: (e: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<SVGPathElement>) => void;
    onClick?: (e: React.MouseEvent<SVGPathElement>) => void;
    className?: string;
    tabIndex?: number;
    "aria-label"?: string;
  }
  export function Geography(props: GeographyProps): JSX.Element;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent<SVGGElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<SVGGElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<SVGGElement>) => void;
  }
  export function Marker(props: MarkerProps): JSX.Element;

  export function Sphere(props: { fill?: string; stroke?: string; strokeWidth?: number }): JSX.Element;
  export function Graticule(props: { fill?: string; stroke?: string; strokeWidth?: number }): JSX.Element;
}
