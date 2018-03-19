// Copy paste from https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
export default function() {
  if (typeof window !== 'undefined' && window.onfocusin === undefined) {
    window.document.addEventListener('focus', addPolyfill, true);
    window.document.addEventListener('blur', addPolyfill, true);
    window.document.addEventListener('focusin', removePolyfill, true);
    window.document.addEventListener('focusout', removePolyfill, true);
  }

  function addPolyfill(e) {
    var type = e.type === 'focus' ? 'focusin' : 'focusout';
    var event = new CustomEvent(type, {
      bubbles: true,
      cancelable: false
    });
    event.c1Generated = true;
    e.target.dispatchEvent(event);
  }

  function removePolyfill(e) {
    if (!e.c1Generated) { // focus after focusin, so chrome will the first time trigger tow times focusin
      window.document.removeEventListener('focus', addPolyfill, true);
      window.document.removeEventListener('blur', addPolyfill, true);
      window.document.removeEventListener('focusin', removePolyfill, true);
      window.document.removeEventListener('focusout', removePolyfill, true);
    }
    setTimeout(function () {
      window.document.removeEventListener('focusin', removePolyfill, true);
      window.document.removeEventListener('focusout', removePolyfill, true);
    });
  }
};
