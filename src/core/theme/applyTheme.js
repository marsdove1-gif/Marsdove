const FLAT_VARS = {
  colors: {
    primary: "--primary",
    primaryDark: "--primary-dark",
    primaryLight: "--primary-light",
    secondary: "--secondary",
    accent: "--accent",
    background: "--bg",
    surface: "--surface",
    surfaceAlt: "--surface-alt",
    border: "--border",
    text: "--text",
    textLight: "--text-light",
    textMuted: "--text-muted",
    textInverse: "--text-inverse",
    success: "--success",
    warning: "--warning",
    danger: "--danger",
    info: "--info",
    badge: "--badge"
  },
  fonts: {
    body: "--font-body",
    heading: "--font-heading",
    accent: "--font-accent"
  },
  radius: {
    xs: "--radius-xs",
    sm: "--radius-sm",
    md: "--radius-md",
    lg: "--radius-lg",
    pill: "--radius-pill"
  },
  spacing: {
    xs: "--space-xs",
    sm: "--space-sm",
    md: "--space-md",
    lg: "--space-lg",
    xl: "--space-xl"
  },
  shadows: {
    sm: "--shadow-sm",
    md: "--shadow-md",
    lg: "--shadow-lg"
  },
  motion: {
    fast: "--transition-fast",
    normal: "--transition-normal"
  },
  typography: {
    xs: "--font-xs",
    sm: "--font-sm",
    md: "--font-md",
    lg: "--font-lg",
    xl: "--font-xl",
    xxl: "--font-2xl",
    normal: "--font-weight-normal",
    medium: "--font-weight-medium",
    bold: "--font-weight-bold",
    lineSm: "--line-height-sm",
    lineMd: "--line-height-md",
    lineLg: "--line-height-lg"
  },
  buttons: {
    paddingXs: "--btn-padding-xs",
    paddingSm: "--btn-padding-sm",
    paddingMd: "--btn-padding-md",
    paddingLg: "--btn-padding-lg"
  },
  layout: {
    containerWidth: "--container-width"
  }
};

const SEMANTIC = {
  "--color-action-primary": "--primary",
  "--color-action-primary-hover": "--primary-dark",
  "--color-action-primary-soft": "--primary-light",
  "--color-surface": "--surface",
  "--color-surface-raised": "--surface",
  "--color-surface-sunken": "--surface-alt",
  "--color-text": "--text",
  "--color-text-secondary": "--text-light",
  "--color-text-muted": "--text-muted",
  "--color-text-inverse": "--text-inverse",
  "--color-border": "--border",
  "--color-focus": "--primary",
  "--color-success": "--success",
  "--color-warning": "--warning",
  "--color-danger": "--danger",
  "--color-info": "--info",
  "--color-accent": "--accent"
};

function applyGroup(root, values = {}, map = {}) {
  for (const [key, cssVar] of Object.entries(map)) {
    if (values[key] != null) root.style.setProperty(cssVar, values[key]);
  }
}

export function applyTheme(theme = {}, root = document.documentElement) {
  for (const [group, map] of Object.entries(FLAT_VARS)) {
    applyGroup(root, theme[group], map);
  }

  for (const [semanticVar, sourceVar] of Object.entries(SEMANTIC)) {
    root.style.setProperty(semanticVar, `var(${sourceVar})`);
  }

  return root;
}
