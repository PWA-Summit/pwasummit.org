// Hot reloading for HTML
if (import.meta.hot) {
  import.meta.hot.on('eleventy-update', ({ changed }) => {
    if (changed.includes(window.location.pathname)) {
      import.meta.hot.invalidate();
    }
  });
}
