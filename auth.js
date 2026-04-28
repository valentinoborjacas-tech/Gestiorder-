(function() {
  const session = sessionStorage.getItem('go_user');
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
 
  try {
    const user = JSON.parse(session);
    // Mostrar nombre del usuario en el sidebar cuando cargue el DOM
    document.addEventListener('DOMContentLoaded', function() {
      const userEl = document.getElementById('sidebarUser');
      if (userEl) {
        userEl.textContent = user.name || user.email;
      }
    });
  } catch(e) {
    sessionStorage.removeItem('go_user');
    window.location.href = 'login.html';
  }
})();
 
function cerrarSesion() {
  sessionStorage.removeItem('go_user');
  window.location.href = 'login.html';
}
