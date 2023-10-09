function cambiarColorAutomatico() {
    const div = document.getElementById('bordes-cambiantes');
    
    setInterval(function() {
      if (div.classList.contains('borde-verde')) {
        div.classList.remove('borde-verde');
        div.classList.add('borde-azul');
      } else {
        div.classList.remove('borde-azul');
        div.classList.add('borde-verde');
      }
    }, 1000); // Cambio cada 2 segundos (2000 milisegundos)
  }
  
  cambiarColorAutomatico(); // Inicia el cambio automático de color al cargar la página
  