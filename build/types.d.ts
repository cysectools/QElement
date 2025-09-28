export interface QElementStyle {
    padding?: number | string;
    margin?: number | string;
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    zIndex?: number;
    display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    flex?: number | string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number | string;
    gap?: number | string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridColumn?: string;
    gridRow?: string;
    gridArea?: string;
    backgroundColor?: string;
    color?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
    fontFamily?: string;
    lineHeight?: number | string;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    textDecoration?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    letterSpacing?: number | string;
    wordSpacing?: number | string;
    border?: string;
    borderTop?: string;
    borderRight?: string;
    borderBottom?: string;
    borderLeft?: string;
    borderRadius?: number | string;
    borderTopLeftRadius?: number | string;
    borderTopRightRadius?: number | string;
    borderBottomLeftRadius?: number | string;
    borderBottomRightRadius?: number | string;
    borderWidth?: number | string;
    borderStyle?: string;
    borderColor?: string;
    boxShadow?: string;
    textShadow?: string;
    opacity?: number;
    filter?: string;
    backdropFilter?: string;
    transform?: string;
    transformOrigin?: string;
    transition?: string;
    animation?: string;
    animationDuration?: number | string;
    animationDelay?: number | string;
    animationIterationCount?: number | string;
    animationDirection?: string;
    animationFillMode?: string;
    animationPlayState?: string;
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
    overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
    overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
    cursor?: string;
    userSelect?: 'none' | 'auto' | 'text' | 'all' | 'contain';
    pointerEvents?: 'auto' | 'none';
    '@media'?: {
        [breakpoint: string]: Partial<QElementStyle>;
    };
    [key: string]: any;
}
export interface QElementProps {
    id?: string;
    className?: string;
    style?: QElementStyle;
    children?: React.ReactNode;
    [key: string]: any;
}
export interface QElementConfig {
    id: string;
    style: QElementStyle;
    children?: QElementConfig[];
    metadata?: QElementMetadata;
}
export interface QElementMetadata {
    tags?: string[];
    description?: string;
    version?: string;
    createdAt?: Date;
    updatedAt?: Date;
    author?: string;
    [key: string]: any;
}
export interface QElementTheme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        border: string;
        error: string;
        warning: string;
        success: string;
        info: string;
    };
    typography: {
        fontFamily: string;
        fontSize: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
        };
        fontWeight: {
            light: number;
            normal: number;
            medium: number;
            semibold: number;
            bold: number;
        };
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    borderRadius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}
export interface QElementValidationRule {
    property: string;
    validator: (value: any) => boolean;
    message: string;
}
export interface QElementValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
export interface QElementAnimation {
    name: string;
    duration: number;
    timingFunction: string;
    delay?: number;
    iterationCount?: number | 'infinite';
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}
export interface QElementResponsiveConfig {
    breakpoints: {
        [key: string]: string;
    };
    defaultBreakpoint: string;
}
export interface QElementPerformanceConfig {
    enableMemoization: boolean;
    enableLazyLoading: boolean;
    maxCacheSize: number;
    debounceDelay: number;
}
