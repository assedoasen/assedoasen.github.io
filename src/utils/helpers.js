export default {
  handleBodyOverflow(
    shouldPreventBodyScroll,
    stopBodyScrollEnabling = false
  ) {

    const scrollTop1 =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    const scrollTop2 = Math.abs(parseInt(document.body.style.top));
    const scrollTop = isNaN(scrollTop2) ? scrollTop1 : scrollTop2;

    if (shouldPreventBodyScroll) {
      document.body.style.width = "calc(100% - 0px)";
      document.body.style.position = "fixed";
      document.body.style.top = -scrollTop + "px";
      document.body.style.overflowY = "hidden";
    } else {
      if (stopBodyScrollEnabling) {
        return;
      }
      document.body.style.width = "";
      document.body.style.position = "static";
      document.body.style.top = "";
      document.body.style.overflowY = "scroll";
      window.scrollTo(0, scrollTop);
    }
  },
  mutationMapper(state) {
    const m = {};
    Object.keys(state).forEach(key => {
      m["set" + key.charAt(0).toUpperCase() + key.substr(1)] = (
        state,
        payload
      ) => {
        state[key] = payload;
      };
    });
    return m;
  },
};
