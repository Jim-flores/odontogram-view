let stylesInjected = false;

export function injectLibraryStyles(cssText: string) {
  if (stylesInjected || typeof document === "undefined") {
    return;
  }

  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-odontogram-view", "true");
  styleTag.textContent = cssText;
  document.head.appendChild(styleTag);
  stylesInjected = true;
}
