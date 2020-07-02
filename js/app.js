import * as ui from './interfaz.js';
import { API } from './api.js';

ui.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    //obttener datos del formulario
    const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

    console.log(artista);
    console.log(cancion);

    if (artista === '' || cancion === '') {
        //el uruario deja los campos vasios
        ui.divMensajes.innerHTML = 'Error todos los campos son obligatorios';
        ui.divMensajes.classList.add('error');
        setTimeout(() => {
            ui.divMensajes.innerHTML = '';
            ui.divMensajes.classList.remove('error');
        }, 2000);
    } else {
        //el formulario esta completo entonces consulta a la api
        const api = new API(artista, cancion);
        api.consultarAPi()
            .then(data => {
                if (data.respuesta.lyrics) {
                    //la cansion existe
                    const letra = data.respuesta.lyrics;
                    ui.divResultado.textContent = letra;
                } else {
                    //ela cansion no esiste
                    ui.divMensajes.innerHTML = 'Error comprueve si ingreso los datos correctos o la cancion no existe, prueba con otra cancion';
                    ui.divMensajes.classList.add('error');
                    setTimeout(() => {
                        ui.divMensajes.innerHTML = '';
                        ui.divMensajes.classList.remove('error');
                        ui.formularioBuscar.reset();
                    }, 3000);
                }
            });
    }
});