import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div class="container user_card mt-5">
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="error-template">
                    <h1>
                        Lo sentimos!</h1>
                    <h2>
                        404 Pagina no encontrada</h2>
                    <div class="error-details">
                        Por favor vuelva al inicio del sitio
                </div>
                    <Link className="btn btn-primary text-center mt-4" to="/">
                        Inicio
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
