/**
 * @file index script
 * @author Mingze Ma
 */

// Onload action
window.onload = () => globalInit()

/**
 * service worker registration
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('[Service Worker] Register successfully: ', registration);
        console.log('[Service Worker] SW registered with scope: ', registration.scope);
      })
      .catch(err => {
        console.error('[Service Worker] Registration failed:', err);
      });
  });
} else {
  console.warn('[Service Worker] No service worker supported');
}


const orderByDate = document.querySelector('#order-by-date')
const orderByAuthor = document.querySelector('#order-by-author')

/**
 * Order stories by date
 */
orderByDate.addEventListener('click', (e) => {
  e.preventDefault()
  var des = orderByDate.dataset.doc
  if (des == 1) {
    window.location.href = "/order_by_date_des"
  } else {
    window.location.href = "/order_by_date"
  }
})

/**
 * Order stories by author name
 */
orderByAuthor.addEventListener('click', (e) => {
  e.preventDefault()
  var des = orderByAuthor.dataset.doc
  if (des == 1) {
    window.location.href = "/order_by_author_des"
  } else {
    window.location.href = "/order_by_author"
  }
})
