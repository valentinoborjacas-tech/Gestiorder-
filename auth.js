(function() {
  const session = sessionStorage.getItem('go_user');
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  try {
    const user = JSON.parse(session);
    const currentPage = window.location.pathname.split('/').pop();

    // Si es operario e intenta entrar a cualquier página que no sea operario.html
    if (user.rol === 'operario' && currentPage !== 'operario.html') {
      window.location.href = 'operario.html';
      return;
    }

    // Si no tiene sesión activa y llega a index.html, redirigir a dashboard
    if (user.rol === 'admin' && currentPage === '') {
      window.location.href = 'dashboard.html';
      return;
    }

    // Mostrar nombre del usuario en el sidebar
    document.addEventListener('DOMContentLoaded', function() {
      const userEl = document.getElementById('sidebarUser');
      if (userEl) userEl.textContent = user.name || user.email;

      const rolEl = document.getElementById('sidebarRol');
      if (rolEl) {
        rolEl.textContent = user.rol === 'admin' ? 'Administrador' : 'Operario';
        rolEl.style.color = user.rol === 'admin' ? '#5DCD00' : '#5DCD00';
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
