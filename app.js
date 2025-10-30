document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // US-18: LÓGICA DEL COMPARADOR DE METODOLOGÍAS
    // ==========================================================

    const comparadorData = {
        scrum: {
            nombre: 'Scrum',
            flexibilidad: 'Alta. Diseñado para cambios a través de Sprints.',
            tiempo: 'Corto. Entregas incrementales cada 2-4 semanas.',
            documentacion: 'Media. Se enfoca en el "Producto Mínimo Viable".',
            costo: 'Medio. Requiere roles dedicados (Scrum Master, P.O.).'
        },
        kanban: {
            nombre: 'Kanban',
            flexibilidad: 'Muy Alta. Permite cambios continuos en el flujo.',
            tiempo: 'Continua. Entrega tan pronto como se completa la tarea.',
            documentacion: 'Baja. Prioriza la visualización y el flujo de trabajo.',
            costo: 'Bajo. Se integra fácilmente en equipos existentes.'
        },
        xp: {
            nombre: 'eXtreme Programming (XP)',
            flexibilidad: 'Máxima. Prácticas para cambios diarios (Pair Programming).',
            tiempo: 'Muy Corto. Iteraciones de 1-2 semanas.',
            documentacion: 'Baja. El código limpio es la documentación principal.',
            costo: 'Medio-Alto. Requiere alta colaboración y disciplina.',
        },
        cascada: {
            nombre: 'Cascada',
            flexibilidad: 'Baja. El cambio es costoso una vez iniciada la fase.',
            tiempo: 'Largo. La entrega funcional es al final del proyecto.',
            documentacion: 'Alta. Énfasis en la documentación formal previa.',
            costo: 'Alto. El riesgo de fallo se detecta tarde.'
        },
        incremental: { // ¡NUEVO!
            nombre: 'Modelo Incremental',
            flexibilidad: 'Media. Los cambios se aceptan entre incrementos.',
            tiempo: 'Medio. Se entrega una versión funcional por fase.',
            documentacion: 'Media. Documentación por cada incremento.',
            costo: 'Medio. Costo dividido en fases, menor riesgo inicial.'
        },
        modelov: { // ¡NUEVO!
            nombre: 'Modelo en V',
            flexibilidad: 'Baja. Similar a Cascada, muy riguroso y secuencial.',
            tiempo: 'Largo. Énfasis en las pruebas formales al final.',
            documentacion: 'Muy Alta. Cada fase de desarrollo tiene una fase de prueba asociada.',
            costo: 'Alto. Ideal para sistemas críticos que requieren alta verificación.'
        }
    };

    const opcionesComparador = document.getElementById('opciones-comparador');
    const tablaComparativaDiv = document.getElementById('tabla-comparativa');

    if (opcionesComparador) {
        opcionesComparador.addEventListener('change', actualizarComparador);
    }

    function actualizarComparador() {
        const seleccionadas = Array.from(document.querySelectorAll('#opciones-comparador input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        if (seleccionadas.length < 2) {
            tablaComparativaDiv.innerHTML = '<p>Selecciona dos o más metodologías para comparar.</p>';
            return;
        }

        generarTabla(seleccionadas);
    }

    function generarTabla(claves) {
        let html = '<table>';
        
        // 1. Encabezados (Metodologías seleccionadas)
        html += '<thead><tr><th>Característica</th>';
        claves.forEach(clave => {
            html += `<th>${comparadorData[clave].nombre}</th>`;
        });
        html += '</tr></thead>';

        // 2. Cuerpo de la tabla (Características)
        html += '<tbody>';
        
        // Fila 1: Flexibilidad
        html += `<tr><th>Flexibilidad (Cambio)</th>`;
        claves.forEach(clave => {
            html += `<td>${comparadorData[clave].flexibilidad}</td>`;
        });
        html += '</tr>';

        // Fila 2: Tiempo de Entrega
        html += `<tr><th>Tiempo (Entrega)</th>`;
        claves.forEach(clave => {
            html += `<td>${comparadorData[clave].tiempo}</td>`;
        });
        html += '</tr>';

        // Fila 3: Documentación
        html += `<tr><th>Documentación</th>`;
        claves.forEach(clave => {
            html += `<td>${comparadorData[clave].documentacion}</td>`;
        });
        html += '</tr>';

        // Fila 4: Costo
        html += `<tr><th>Costo y Riesgo</th>`;
        claves.forEach(clave => {
            html += `<td>${comparadorData[clave].costo}</td>`;
        });
        html += '</tr>';
        
        html += '</tbody></table>';
        tablaComparativaDiv.innerHTML = html;
    }


    // ==========================================================
    // US-19: LÓGICA DE LA ENCUESTA DE PREFERENCIAS
    // ==========================================================

    const formulario = document.getElementById('formulario-encuesta');
    const resultadoDiv = document.getElementById('resultado-encuesta');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío tradicional del formulario
            
            // Puntuación se mantiene la misma: 1 = Tradicional, 3 = Ágil
            const puntuaciones = {
                'alto': 3, 'medio': 2, 'bajo': 1, // P1: Cambio (Alto = Ágil)
                'corto': 3, 'medio': 2, 'largo': 1, // P2: Entrega (Corto = Ágil)
                'baja': 3, 'media': 2, 'alta': 1  // P3: Documentación (Baja = Ágil)
            };

            const cambio = document.getElementById('p1').value;
            const entrega = document.getElementById('p2').value;
            const documentacion = document.getElementById('p3').value;
            
            const score = puntuaciones[cambio] + puntuaciones[entrega] + puntuaciones[documentacion];

            let recomendacion = '';
            let explicacion = '';

            // Lógica de recomendación actualizada para 5 metodologías (score de 3 a 9)
            if (score >= 8) {
                recomendacion = 'Kanban o eXtreme Programming (XP)';
                explicacion = 'Tu proyecto requiere la máxima adaptabilidad, entregas continuas y prefieres centrarte en el código funcional. Las metodologías ágiles puras son tu mejor opción.';
            } else if (score === 7) {
                recomendacion = 'Scrum';
                explicacion = 'Tu proyecto necesita estructura y adaptabilidad. Scrum ofrece un marco balanceado, ideal para gestionar proyectos con requisitos evolutivos a un ritmo constante.';
            } else if (score >= 5) {
                recomendacion = 'Modelo Incremental';
                explicacion = 'Buscas flexibilidad limitada y puedes tener entregas intermedias, pero necesitas una planificación más formal que Scrum. El Modelo Incremental reduce el riesgo por fase.';
            } else if (score === 4) {
                recomendacion = 'Modelo en V';
                explicacion = 'La verificación y la validación son cruciales para tu proyecto. El Modelo en V es muy riguroso y asegura que cada fase de desarrollo esté ligada a una prueba exhaustiva.';
            } else { // score <= 3
                recomendacion = 'Modelo Cascada';
                explicacion = 'Tus requisitos son estables, la documentación formal es crucial y la entrega final a largo plazo es aceptable. El Modelo Cascada es el más adecuado para entornos fijos y predecibles.';
            }

            // Mostrar resultado
            resultadoDiv.innerHTML = `
                <p>Tu puntuación de agilidad es: ${score} / 9</p>
                <h3>Recomendación: <span style="color: #d84315;">${recomendacion}</span></h3>
                <p style="font-weight: normal; font-size: 0.9em;">${explicacion}</p>
            `;
            resultadoDiv.classList.remove('oculto');
        });
    }
});