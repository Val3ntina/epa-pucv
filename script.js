document.addEventListener('DOMContentLoaded', () => {
    const mallaContainer = document.getElementById('malla');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resetMallaBtn = document.getElementById('resetMallaBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Datos de los ramos con sus propiedades, incluyendo el tipo para el color y créditos
    const ramosData = [
        // Semestre 1
        { semestre: 1, nombre: 'Introducción a la Educación Parvularia', sigla: 'EPA 1124', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 1, nombre: 'Desarrollo Infantil y Neurociencias', sigla: 'EPA 1120', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 1, nombre: 'Creatividad y Sensibilidad Estética del Educador de Párvulos', sigla: 'EPA 1125', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 1, nombre: 'Juego en Educación Parvularia', sigla: 'EPA 1127', creditos: 2, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 1, nombre: 'Taller de Integración Curricular 1: Saber Profesional de la Educadora de Párvulos', sigla: 'EPA 1129', creditos: 2, prerrequisitos: [], tipo: 'linea-practica' },
        { semestre: 1, nombre: 'Estrategias Discursivas para Acceder al Conocimiento Disciplinar', sigla: 'LCL 122', creditos: 2, prerrequisitos: [], tipo: 'lenguaje' },
        { semestre: 1, nombre: 'Antropología Cristiana', sigla: 'ICR 010', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },

        // Semestre 2
        { semestre: 2, nombre: 'Perspectivas Críticas sobre Infancia', sigla: 'EPA 1131', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 2, nombre: 'Ambientes Saludables en Educación Parvularia', sigla: 'EPA 1132', creditos: 2, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 2, nombre: 'Fundamentos de la Psicología del Aprendizaje y Desarrollo en Educación Parvularia', sigla: 'PSI 300', creditos: 2, prerrequisitos: [], tipo: 'psicologia' },
        { semestre: 2, nombre: 'Bases y Desarrollo de la Formación Social y Personal en Educación Parvularia', sigla: 'EPA 1130', creditos: 2, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 2, nombre: 'Curriculum en Educación Parvularia', sigla: 'EPA 1149', creditos: 3, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 2, nombre: 'Taller de Integración Curricular 2: Construcción Sociales sobre Infancia', sigla: 'EPA 1151', creditos: 2, prerrequisitos: [], tipo: 'linea-practica' },
        { semestre: 2, nombre: 'Inglés 1', sigla: 'ING 9001', creditos: 2, prerrequisitos: [], tipo: 'lenguaje' },
        { semestre: 2, nombre: 'Formación Fundamental 1', sigla: 'FF 1', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },

        // Semestre 3
        { semestre: 3, nombre: 'Taller de la Psicología del Desarrollo y Aprendizaje en Niñez de 0 a 3 años', sigla: 'PSI 299', creditos: 2, prerrequisitos: ['PSI 300'], tipo: 'psicologia' },
        { semestre: 3, nombre: 'Bases y Desarrollo de la Corporalidad y la Motricidad en el Párvulo', sigla: 'EFI 1153', creditos: 2, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 3, nombre: 'Bases y Desarrollo de los Lenguajes Artísticos en Educación Parvularia', sigla: 'EPA 1153', creditos: 2, prerrequisitos: [], tipo: 'didactica' },
        { semestre: 3, nombre: 'Educación Parvularia y Familia', sigla: 'EPA 351', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 3, nombre: 'Didáctica del Desarrollo Personal y Social en Educación Parvularia', sigla: 'EPA 1155', creditos: 3, prerrequisitos: ['EPA 1130'], tipo: 'didactica' },
        { semestre: 3, nombre: 'Taller de Integración Curricular 3: Ambientes para el Aprendizaje', sigla: 'EPA 1157', creditos: 2, prerrequisitos: ['EPA 1149', 'EPA 1151'], tipo: 'linea-practica' },
        { semestre: 3, nombre: 'Ética Cristiana', sigla: 'ICR 020', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },

        // Semestre 4
        { semestre: 4, nombre: 'Taller de la Psicología del Desarrollo y Aprendizaje en Niñez de 3 a 6 años', sigla: 'PSI 303', creditos: 2, prerrequisitos: ['PSI 300'], tipo: 'psicologia' },
        { semestre: 4, nombre: 'Educar en y para la Diversidad', sigla: 'EPE 1320', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 4, nombre: 'Simbolización en el Párvulo', sigla: 'EPA 1150', creditos: 2, prerrequisitos: ['PSI 300'], tipo: 'didactica' },
        { semestre: 4, nombre: 'Didáctica de Lenguajes Artísticos Integrados', sigla: 'EPA 1165', creditos: 3, prerrequisitos: ['EPA 1153'], tipo: 'didactica' },
        { semestre: 4, nombre: 'Educación de la Motricidad en el Párvulo', sigla: 'EFI 1154', creditos: 3, prerrequisitos: ['EFI 1153'], tipo: 'didactica' },
        { semestre: 4, nombre: 'Práctica Docente Inicial', sigla: 'PRA 101-56', creditos: 4, prerrequisitos: [], tipo: 'linea-practica' },
        { semestre: 4, nombre: 'Inglés 2', sigla: 'ING 9002', creditos: 2, prerrequisitos: ['ING 9001'], tipo: 'lenguaje' },

        // Semestre 5
        { semestre: 5, nombre: 'Fundamentos Filosóficos y Sociales de la Educación', sigla: 'EPE 1118', creditos: 3, prerrequisitos: ['PRA 101-56'], tipo: 'formacion-fundamental' },
        { semestre: 5, nombre: 'Adquisición y Desarrollo de la Lengua', sigla: 'EPA 1161', creditos: 3, prerrequisitos: ['EPA 1150'], tipo: 'lenguaje' },
        { semestre: 5, nombre: 'Construcción Comunidades en Educación Parvularia', sigla: 'EPA 1245', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 5, nombre: 'Psicología Social Aplicada a la Escuela y la Comunidad', sigla: 'PSI 275', creditos: 3, prerrequisitos: [], tipo: 'psicologia' },
        { semestre: 5, nombre: 'Taller de Integración Curricular 4: Curriculum Cultural', sigla: 'EPA 1160', creditos: 2, prerrequisitos: ['EPA 1151'], tipo: 'linea-practica' },
        { semestre: 5, nombre: 'Estrategias Discursivas para Comunicar y Enseñar el Conocimiento Disciplinar', sigla: 'LCL 465', creditos: 2, prerrequisitos: [], tipo: 'lenguaje' },
        { semestre: 5, nombre: 'Formación Fundamental 2', sigla: 'FF 2', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 5, nombre: 'Optativo (Diseño y Evaluación de Recursos Didácticos y Espacios Educativos Para el Aula Infantil)', sigla: 'EPE 3468', creditos: 3, prerrequisitos: [], tipo: 'optativo', observaciones: 'EL OPTATIVO VARIA SEGUN LA PERSONA' },

        // Semestre 6
        { semestre: 6, nombre: 'Desarrollo del Pensamiento Matemático', sigla: 'EPA 1166', creditos: 2, prerrequisitos: ['EPA 1150'], tipo: 'didactica' },
        { semestre: 6, nombre: 'Teoría y Planificación Curricular', sigla: 'EPE 1303', creditos: 3, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 6, nombre: 'Didáctica en Educación Parvularia de 0 a 3 años', sigla: 'EPA 1159', creditos: 3, prerrequisitos: ['EPA 1149'], tipo: 'didactica' },
        { semestre: 6, nombre: 'Didáctica del Lenguaje Verbal', sigla: 'EPA 1167', creditos: 3, prerrequisitos: ['EPA 1161'], tipo: 'lenguaje' },
        { semestre: 6, nombre: 'Tecnologías Digitales para el Aprendizaje y Desarrollo Profesional Docente', sigla: 'EPE 1132', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 6, nombre: 'Taller de Integración Curricular 5: Desarrollo, Enseñanza y Aprendizaje', sigla: 'EPA 1168', creditos: 2, prerrequisitos: ['EPA 1157'], tipo: 'linea-practica' },
        { semestre: 6, nombre: 'Inglés 3', sigla: 'ING 9003', creditos: 2, prerrequisitos: ['ING 9002'], tipo: 'lenguaje' },
        { semestre: 6, nombre: 'Formación Fundamental 3', sigla: 'FF 3', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },

        // Semestre 7
        { semestre: 7, nombre: 'Construcción del Conocimiento de las Ciencias Naturales en Educación Parvularia', sigla: 'EPA 1169', creditos: 2, prerrequisitos: ['EPA 1150'], tipo: 'didactica' },
        { semestre: 7, nombre: 'Construcción del Conocimiento de las Ciencias Sociales en Educación Parvularia', sigla: 'EPA 1170', creditos: 2, prerrequisitos: ['EPA 1150'], tipo: 'didactica' },
        { semestre: 7, nombre: 'Evaluación del y para el Aprendizaje', sigla: 'EPE 1302', creditos: 3, prerrequisitos: ['EPE 1303'], tipo: 'formacion-fundamental' },
        { semestre: 7, nombre: 'Didáctica en Eduación Parvularia de 3 a 6 años', sigla: 'EPA 1171', creditos: 3, prerrequisitos: ['EPA 1149'], tipo: 'didactica' },
        { semestre: 7, nombre: 'Didática Iniciación Matemática', sigla: 'EPA 1344', creditos: 3, prerrequisitos: ['EPA 1166'], tipo: 'didactica' },
        { semestre: 7, nombre: 'Práctica Docente Intermedia', sigla: 'PRA 301-56', creditos: 6, prerrequisitos: ['PRA 101-56', 'EPE 1303'], tipo: 'linea-practica' },

        // Semestre 8
        { semestre: 8, nombre: 'Identidad Profesional Docente', sigla: 'EPE 1130', creditos: 3, prerrequisitos: ['PRA 301-56'], tipo: 'formacion-fundamental' },
        { semestre: 8, nombre: 'Investigación Educativa y Pedagógica', sigla: 'EPE 1342', creditos: 3, prerrequisitos: ['PRA 301-56'], tipo: 'investigacion' },
        { semestre: 8, nombre: 'Didáctica de Iniciación a las Ciencias de la Naturaleza', sigla: 'EPA 1255', creditos: 3, prerrequisitos: ['EPA 1169'], tipo: 'didactica' },
        { semestre: 8, nombre: 'Didáctica de Iniciación a las Ciencias Sociales', sigla: 'EPA 1250', creditos: 3, prerrequisitos: ['EPA 1170'], tipo: 'didactica' },
        { semestre: 8, nombre: 'Contextos Lúdicos en Educación Parvularia', sigla: 'EPA 1172', creditos: 2, prerrequisitos: ['EPA 1127'], tipo: 'didactica' },
        { semestre: 8, nombre: 'Políticas Públicas y Educativas y Gestión Escolar', sigla: 'EPE 1400', creditos: 2, prerrequisitos: [], tipo: 'formacion-fundamental' },
        { semestre: 8, nombre: 'Taller de Integración Curricular 6: Transiciones Educativas desde la Lúdica', sigla: 'EPA 1173', creditos: 2, prerrequisitos: ['EPA 1168'], tipo: 'linea-practica' },
        { semestre: 8, nombre: 'Inglés 4', sigla: 'ING 9004', creditos: 2, prerrequisitos: ['ING 9003'], tipo: 'lenguaje' },

        // Semestre 9
        {
            semestre: 9,
            nombre: 'Trabajo Titulación',
            sigla: 'EPA 1401',
            creditos: 6,
            prerrequisitos: [
                'ING 9004', 'EPA 1173', 'EPE 1400', 'EPA 1172', 'EPA 1250', 'EPA 1255',
                'EPE 1342', 'EPE 1130', 'EPA 1344', 'EPA 1171', 'EPE 1302', 'EPA 1170',
                'EPA 1169', 'EPE 1132', 'EPA 1167', 'EPA 1159', 'LCL 465', 'EPA 1160',
                'PSI 275', 'EPA 1245', 'EPE 1118', 'EFI 1154', 'EPA 1165', 'EPE 1320',
                'PSI 303', 'EPA 1155', 'EPA 351', 'PSI 299', 'EPA 1132', 'EPA 1131',
                'LCL 122', 'EPA 1129', 'EPA 1120', 'EPA 1124', 'EPA 1125', 'EPA 1127',
                'ICR 010', 'FF 1', 'ICR 020', 'FF 2', 'FF 3', 'ING 9001', 'EPA 1130',
                'EPA 1149', 'EPA 1151', 'PSI 300', 'EFI 1153', 'EPA 1153', 'EPA 1150',
                'PRA 101-56', 'EPA 1161', 'EPA 1166', 'EPE 1303', 'EPA 1157', 'ING 9002', 'ING 9003'
            ],
            tipo: 'investigacion'
        },
        {
            semestre: 9,
            nombre: 'Práctica Docente Final 1',
            sigla: 'PRA 601-56',
            creditos: 14,
            prerrequisitos: [
                'PRA 301-56', 'EPE 1302', 'EPE 1320', 'EPE 1342', 'EPE 1132', 'EPA 1173',
                'LCL 465', 'EPA 1250', 'EPA 1255', 'EPA 1172', 'EPA 1171', 'EPA 1344',
                'EPA 1167', 'EPA 1159', 'EPA 1245', 'EFI 1154', 'EPA 1165', 'EPA 1155',
                'EPA 351', 'EPA 1124', 'EPA 1131', 'EPA 1132', 'EPA 1120', 'EPA 1125',
                'EPA 1127', 'ICR 010', 'FF 1', 'ICR 020', 'FF 2', 'FF 3', 'ING 9001',
                'EPA 1130', 'EPA 1149', 'EPA 1151', 'PSI 300', 'EFI 1153', 'EPA 1153',
                'EPA 1150', 'PRA 101-56', 'EPA 1161', 'EPA 1166', 'EPE 1303', 'EPA 1157',
                'ING 9002', 'ING 9003', 'ING 9004'
            ],
            tipo: 'linea-practica'
        },

        // Semestre 10
        { semestre: 10, nombre: 'Práctica Docente Final 2', sigla: 'PRA 701-56', creditos: 16, prerrequisitos: ['PRA 601-56'], tipo: 'linea-practica' },
    ];

    let ramosAprobados = new Set(); // Conjunto para almacenar las siglas de los ramos aprobados
    let ramosNotas = new Map(); // Mapa para almacenar notas personalizadas por sigla
    let totalCreditos = 0;

    // Mapear ramos por sigla para acceso rápido
    const ramosMap = new Map(ramosData.map(ramo => [ramo.sigla, ramo]));

    // Calcular el total de créditos de la malla
    ramosData.forEach(ramo => {
        totalCreditos += ramo.creditos;
    });

    // Agrupar ramos por semestre para facilitar la renderización
    // ESTA ES LA DEFINICIÓN QUE FALTABA MOVER ARRIBA
    const semestresAgrupados = ramosData.reduce((acc, ramo) => {
        if (!acc[ramo.semestre]) {
            acc[ramo.semestre] = [];
        }
        acc[ramo.semestre].push(ramo);
        return acc;
    }, {});


    /**
     * Carga el estado de los ramos aprobados, notas y modo oscuro desde localStorage.
     */
    function loadState() {
        const savedApproved = localStorage.getItem('ramosAprobados');
        if (savedApproved) {
            ramosAprobados = new Set(JSON.parse(savedApproved));
        }

        const savedNotes = localStorage.getItem('ramosNotas');
        if (savedNotes) {
            ramosNotas = new Map(JSON.parse(savedNotes));
        }

        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    /**
     * Guarda el estado actual de los ramos aprobados, notas y modo oscuro en localStorage.
     */
    function saveState() {
        localStorage.setItem('ramosAprobados', JSON.stringify(Array.from(ramosAprobados)));
        localStorage.setItem('ramosNotas', JSON.stringify(Array.from(ramosNotas.entries())));
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    /**
     * Actualiza la barra de progreso.
     */
    function updateProgressBar() {
        let creditosAprobados = 0;
        ramosAprobados.forEach(sigla => {
            const ramo = ramosMap.get(sigla);
            if (ramo) {
                creditosAprobados += ramo.creditos;
            }
        });

        const porcentaje = totalCreditos > 0 ? (creditosAprobados / totalCreditos) * 100 : 0;
        progressBar.style.width = `${porcentaje}%`;
        progressText.textContent = `${Math.round(porcentaje)}% Completado (${creditosAprobados}/${totalCreditos} Créditos)`;
    }

    /**
     * Renderiza la malla curricular completa en el DOM.
     * Calcula el estado de cada ramo (aprobado, bloqueado, desbloqueado)
     * y aplica las clases CSS correspondientes.
     */
    function renderMalla() {
        mallaContainer.innerHTML = ''; // Limpiar la malla antes de volver a renderizar

        for (const sem in semestresAgrupados) {
            const semestreDiv = document.createElement('div');
            semestreDiv.classList.add('semestre');
            semestreDiv.innerHTML = `<h3>Semestre ${sem}</h3>`;

            semestresAgrupados[sem].forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.classList.add('ramo', ramo.tipo); // Añadir la clase de tipo para el color
                ramoDiv.dataset.sigla = ramo.sigla; // Almacenar la sigla como data attribute

                const isApproved = ramosAprobados.has(ramo.sigla);
                let isBlocked = false;
                let missingPrereqs = [];

                // Verificar si el ramo tiene prerrequisitos y si están aprobados
                if (ramo.prerrequisitos && ramo.prerrequisitos.length > 0) {
                    missingPrereqs = ramo.prerrequisitos.filter(prereq => !ramosAprobados.has(prereq));
                    if (missingPrereqs.length > 0) {
                        isBlocked = true;
                    }
                }

                // Aplicar clases de estado
                if (isApproved) {
                    ramoDiv.classList.add('aprobado');
                } else if (isBlocked) {
                    ramoDiv.classList.add('bloqueado');
                } else {
                    ramoDiv.classList.add('desbloqueado');
                }

                // Determinar el icono de estado
                let statusIcon = '';
                if (isApproved) {
                    statusIcon = '<i class="fas fa-check-circle status-icon"></i>';
                } else if (isBlocked) {
                    statusIcon = '<i class="fas fa-lock status-icon"></i>';
                } else {
                    statusIcon = '<i class="fas fa-unlock-alt status-icon"></i>'; // Cambiado a unlock-alt para mejor visibilidad
                }

                // Generar el texto de los prerrequisitos si existen
                let prerrequisitosHtml = '';
                if (ramo.prerrequisitos && ramo.prerrequisitos.length > 0) {
                    if (isBlocked) {
                        prerrequisitosHtml = `<p class="prerrequisitos-text">Faltan: ${missingPrereqs.join(', ')}</p>`;
                    } else {
                        prerrequisitosHtml = `<p class="prerrequisitos-text">Prerreq: ${ramo.prerrequisitos.join(', ')}</p>`;
                    }
                }

                // Usar el sigla sin espacios para el ID del checkbox para evitar problemas con IDs HTML
                const checkboxId = `check-${ramo.sigla.replace(/\s/g, '')}`;
                const notesInputId = `notes-${ramo.sigla.replace(/\s/g, '')}`;

                ramoDiv.innerHTML = `
                    <h4>${ramo.nombre}</h4>
                    <p><span class="sigla">${ramo.sigla}</span> | <span class="creditos">${ramo.creditos} Créditos</span></p>
                    ${prerrequisitosHtml}
                    ${statusIcon}
                    <div class="checkbox-container">
                        <input type="checkbox" id="${checkboxId}" ${isApproved ? 'checked' : ''} ${isBlocked && !isApproved ? 'disabled' : ''}>
                        <label for="${checkboxId}">Aprobado</label>
                    </div>
                    <button class="notes-toggle" data-sigla="${ramo.sigla}" title="Añadir/Ver notas">
                        <i class="fas fa-clipboard"></i>
                    </button>
                    <textarea id="${notesInputId}" class="notes-input" placeholder="Añadir notas aquí...">${ramosNotas.get(ramo.sigla) || ''}</textarea>
                `;

                semestreDiv.appendChild(ramoDiv);
            });
            mallaContainer.appendChild(semestreDiv);
        }
        addEventListeners(); // Volver a añadir los event listeners después de re-renderizar
        updateProgressBar(); // Actualizar la barra de progreso
    }

    /**
     * Añade los event listeners a los elementos interactivos.
     */
    function addEventListeners() {
        // Event listeners para checkboxes de aprobación
        document.querySelectorAll('.ramo .checkbox-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const ramoDiv = event.target.closest('.ramo');
                const sigla = ramoDiv.dataset.sigla;

                if (event.target.checked) {
                    ramosAprobados.add(sigla);
                } else {
                    ramosAprobados.delete(sigla);
                }
                saveState();
                renderMalla(); // Re-renderizar la malla para actualizar los estados visuales y progreso
            });
        });

        // Event listeners para toggle de notas
        document.querySelectorAll('.notes-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const sigla = event.currentTarget.dataset.sigla;
                const notesInput = document.getElementById(`notes-${sigla.replace(/\s/g, '')}`);
                notesInput.classList.toggle('active');
                if (notesInput.classList.contains('active')) {
                    notesInput.focus(); // Enfocar el campo de texto cuando se abre
                }
            });
        });

        // Event listeners para guardar notas al cambiar el contenido
        document.querySelectorAll('.notes-input').forEach(textarea => {
            textarea.addEventListener('input', (event) => {
                const sigla = event.target.id.replace('notes-', '').replace(/\s/g, ' ');
                ramosNotas.set(sigla, event.target.value);
                saveState();
            });
        });

        // Event listener para el botón de Reiniciar Malla
        resetMallaBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres reiniciar toda la malla? Se perderá todo tu progreso.')) {
                ramosAprobados.clear();
                ramosNotas.clear();
                localStorage.removeItem('ramosAprobados');
                localStorage.removeItem('ramosNotas');
                renderMalla();
            }
        });

        // Event listener para el botón de Modo Oscuro
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            saveState(); // Guardar la preferencia del modo oscuro
        });

        // Event listeners para resaltar dependencias (mouseover/mouseout)
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            ramoDiv.addEventListener('mouseover', (event) => {
                const currentSigla = event.currentTarget.dataset.sigla;
                const currentRamo = ramosMap.get(currentSigla);

                // Resaltar prerrequisitos
                if (currentRamo && currentRamo.prerrequisitos) {
                    currentRamo.prerrequisitos.forEach(prereqSigla => {
                        const prereqDiv = document.querySelector(`.ramo[data-sigla="${prereqSigla}"]`);
                        if (prereqDiv) {
                            prereqDiv.classList.add('highlight-prereq');
                        }
                    });
                }

                // Resaltar post-requisitos (ramos que tienen el actual como prerrequisito)
                ramosData.forEach(otherRamo => {
                    if (otherRamo.prerrequisitos && otherRamo.prerrequisitos.includes(currentSigla)) {
                        const postreqDiv = document.querySelector(`.ramo[data-sigla="${otherRamo.sigla}"]`);
                        if (postreqDiv) {
                            postreqDiv.classList.add('highlight-postreq');
                        }
                    }
                });
            });

            ramoDiv.addEventListener('mouseout', (event) => {
                // Remover todos los resaltados
                document.querySelectorAll('.ramo.highlight-prereq').forEach(el => el.classList.remove('highlight-prereq'));
                document.querySelectorAll('.ramo.highlight-postreq').forEach(el => el.classList.remove('highlight-postreq'));
            });
        });
    }

    // Cargar estado al inicio y renderizar la malla
    loadState();
    renderMalla();
});
