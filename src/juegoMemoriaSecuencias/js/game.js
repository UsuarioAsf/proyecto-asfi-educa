
const juego = () => {
    const sleep = m => new Promise(r => setTimeout(r, m));
    const cargarSonido = function (fuente) {
        const sonido = document.createElement("audio");
        sonido.src = fuente;
        sonido.setAttribute("preload", "auto");
        sonido.setAttribute("controls", "none");
        sonido.style.display = "none";
        document.body.appendChild(sonido);
        return sonido;
    }
    const partidoEn16 = (Math.PI * 2) / 16;
    const centroX = 200, centroY = 200;
    const radioCirculo = 200;
    const radioCuarto = 170;
    const radioCirculoCentral = 50;
    const distancia = 10;
    const gamma = 2;
    const milisegundosCpu = 200,
        milisegundosUsuario = 100;
    const sonidoSuperiorIzquierda = cargarSonido("1.mp3"),
        sonidoSuperiorDerecha = cargarSonido("2.mp3"),
        sonidoInferiorIzquierda = cargarSonido("3.mp3"),
        sonidoInferiorDerecha = cargarSonido("4.mp3");

    let puedeJugar = false;
    let contador = 0;
    let puntaje = 0;
    let secuencia = [];

    const turquesa = d3.color("#4DAF8F"),
        grisClaro = d3.color("#D8D8D8"),
        celeste = d3.color("#6C6C6C"),
        azul = d3.color("#0D47A1"),
        negro = d3.color("#000000 ");
        // background-color: rgb(26, 87, 118)

        // const turquesa = d3.color("#4DAF8F"),
        // grisClaro = d3.color("#D8D8D8"),
        // celeste = d3.color("#30B8AD"),
        // azul = d3.color("#0D47A1"),
        // negro = d3.color("#2A567B");

    const circuloFondo = d3.arc()
        .innerRadius(0)
        .outerRadius(radioCirculo)
        .startAngle(0)
        .endAngle(Math.PI * 2);

    const circuloCentral = d3.arc()
        .innerRadius(0)
        .outerRadius(radioCirculoCentral)
        .startAngle(0)
        .endAngle(Math.PI * 2);

    const $svg = d3.select("#contenedorJuego")
        .append("svg")
        .attr('width', 400)
        .attr('height', 400);

    $svg.append("g")
        .attr("transform", `translate(${centroX},${centroY})`)
        .append("path")
        .attr("d", circuloFondo)
        .attr("fill", negro);


    const superiorIzquierda = $svg.append("g")
        .attr("transform", `translate(${centroX - distancia},${centroY - distancia})`)
        .attr("class", "boton")
        .append("path")
        .attr("d",
            d3.arc()
                .innerRadius(0)
                .outerRadius(radioCuarto)
                .startAngle(partidoEn16 * 12)
                .endAngle(partidoEn16 * 16)
        )
        .attr("fill", turquesa);


    const superiorDerecha = $svg.append("g")
        .attr("transform", `translate(${centroX + distancia},${centroY - distancia})`)
        .attr("class", "boton")
        .append("path")
        .attr("d",
            d3.arc()
                .innerRadius(0)
                .outerRadius(radioCuarto)
                .startAngle(0)
                .endAngle(partidoEn16 * 4)
        )
        .attr("fill", grisClaro);
    const inferiorIzquierda = $svg.append("g")
        .attr("transform", `translate(${centroX - distancia},${centroY + distancia})`)
        .attr("class", "boton")
        .append("path")
        .attr("d",
            d3.arc()
                .innerRadius(0)
                .outerRadius(radioCuarto)
                .startAngle(partidoEn16 * 8)
                .endAngle(partidoEn16 * 12)
        )
        .attr("fill", celeste);

    const inferiorDerecha = $svg.append("g")
        .attr("transform", `translate(${centroX + distancia},${centroY + distancia})`)
        .attr("class", "boton")
        .append("path")
        .attr("d",
            d3.arc()
                .innerRadius(0)
                .outerRadius(radioCuarto)
                .startAngle(partidoEn16 * 4)
                .endAngle(partidoEn16 * 8)
        )
        .attr("fill", azul);

    // Encima de los otros círculos, el círculo central
    $svg.append("g")
        .attr("transform", `translate(${centroX},${centroY})`)
        .append("path")
        .attr("d", circuloCentral)
        .attr("fill", negro);

    const textoPuntaje = $svg.append("text")
        .attr("transform", `translate(${centroX},${centroY})`)
        .attr("fill", "#ffffff")
        .attr("font-size", 30)
        .attr("font-weight", "bold")
        .attr("font-family", "Courier")
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .text("0")
    const encenderYApagarBoton = async (boton, duracion) => {
        puedeJugar = false;
        const colorActual = boton.attr("fill");
        let sonidoQueSeReproduce;
        if (compararBotones(boton, superiorIzquierda)) {
            sonidoQueSeReproduce = sonidoSuperiorIzquierda;
        } else if (compararBotones(boton, superiorDerecha)) {
            sonidoQueSeReproduce = sonidoSuperiorDerecha;
        } else if (compararBotones(boton, inferiorIzquierda)) {
            sonidoQueSeReproduce = sonidoInferiorIzquierda
        } else {
            sonidoQueSeReproduce = sonidoInferiorDerecha;
        }
        sonidoQueSeReproduce.currentTime = 0;
        await sonidoQueSeReproduce.play();
        boton.attr("fill", d3.color(colorActual).brighter(gamma))
        await sleep(duracion);
        boton.attr("fill", d3.color(colorActual));
        await sleep(duracion);
        await sonidoQueSeReproduce.pause();
        puedeJugar = true;
    };
    const reproducirSecuencia = async secuencia => {
        for (const boton of secuencia) {
            await encenderYApagarBoton(boton, milisegundosCpu);
        }
    };
    const botones = [superiorIzquierda, superiorDerecha, inferiorIzquierda, inferiorDerecha];
    const aleatorioDeArreglo = arreglo => arreglo[Math.floor(Math.random() * arreglo.length)];
    const agregarBotonAleatorioASecuencia = secuencia => secuencia.push(aleatorioDeArreglo(botones));
    const compararBotones = (boton, otroBoton) => {
        return boton.attr("fill") === otroBoton.attr("fill");
    };
    const compararSecuenciaDeUsuarioConOriginal = (secuenciaOriginal, botonDeUsuario, indice) => {
        return compararBotones(secuenciaOriginal[indice], botonDeUsuario);
    };
    const refrescarPuntaje = puntaje => textoPuntaje.text(puntaje.toString());
    const reiniciar = () => {
        secuencia = [];
        puedeJugar = false;
        contador = puntaje = 0;
        refrescarPuntaje(puntaje);
    }

    botones.forEach(boton => {
        boton.on("click", async () => {
            if (!puedeJugar) {
                console.log("No puedes jugar ._.");
                return;
            }
            puedeJugar = false;
            const ok = compararSecuenciaDeUsuarioConOriginal(secuencia, boton, contador);
            if (ok) {
                await encenderYApagarBoton(boton, milisegundosUsuario);
                if (contador >= secuencia.length - 1) {
                    puntaje++;
                    refrescarPuntaje(puntaje);
                    await sleep(500);
                    await turnoDelCpu();
                } else {
                    contador++;
                }
                puedeJugar = true;
            } else {

                $btnComenzar.disabled = false;
                Swal.fire("Perdiste", `Has perdido. Tu puntuación fue de ${puntaje}. <br>Puedes jugar de nuevo cuando quieras`);
            }
        });
    });

    const turnoDelCpu = async () => {
        puedeJugar = false;
        agregarBotonAleatorioASecuencia(secuencia);
        await reproducirSecuencia(secuencia);
        contador = 0;
        puedeJugar = true;
    }

    const $btnComenzar = document.querySelector("#comenzar");
    $btnComenzar.addEventListener("click", () => {
        $btnComenzar.disabled = true;
        reiniciar();
        turnoDelCpu();
    });
}
Swal.fire("Bienvenido querido estudiante!", `<br>Mira la secuencia y trata de imítarla.
<br>
    Veamos a que nivel llegas!!
    <br>
    <br>`)
    .then(juego)
