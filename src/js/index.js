// Hot reloading for HTML
if (import.meta.hot) {
  import.meta.hot.on('eleventy-update', () => {
    import.meta.hot.invalidate();
  });
}
