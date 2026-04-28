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

    // Si es admin e intenta entrar a operario.html, redirigir a index
    if (user.rol === 'admin' && currentPage === 'operario.html') {
      // Admins sí pueden ver operario.html — no redirigir
    }

    // Mostrar nombre del usuario en el sidebar
    document.addEventListener('DOMContentLoaded', function() {
      const userEl = document.getElementById('sidebarUser');
      if (userEl) {
        userEl.textContent = user.name || user.email;
      }
      // Mostrar badge de rol
      const rolEl = document.getElementById('sidebarRol');
      if (rolEl) {
        rolEl.textContent = user.rol === 'admin' ? 'Administrador' : 'Operario';
        rolEl.style.color = user.rol === 'admin' ? 'var(--accent2)' : 'var(--green)';
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
