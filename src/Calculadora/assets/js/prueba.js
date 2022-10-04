let v_monto = 1200;
let v_moneda = "Bs.";
let v_interes = 12;
let v_plazo = 14;
let v_formaPago = "S";
let v_periodoGracia = 0;
let v_seguroDesgravamen = 0;
let v_tipoCuota = "F";

let fila="";
let deuda = v_monto;
let nroCuota = 1;

let m = [0, 1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];

let numerodeCuotas = 0;


let interesPorCuota = 0;
let interesDeCuota = 0;
if(v_formaPago=="M"){
    interesPorCuota=v_interes/12;
    pago = deuda/v_plazo;
}
if(v_formaPago=="T"){
    interesPorCuota=v_interes/4;
    pago = (deuda/(v_plazo/3));
}
if(v_formaPago=="S"){
    interesPorCuota=v_interes/2;
    pago = (deuda/(v_plazo/6));
}
console.log(pago);
interesDeCuota = deuda*(interesPorCuota/100);

let interesAcumulado=0;
let pagoProgramado=0;

while (deuda > 0) {
    if(deuda<pago){
        pago=deuda;
    }
    deuda = deuda - pago;
    interesAcumulado += interesDeCuota;
    pagoProgramado=pago+interesDeCuota;

    fila = "<tr>";
    fila += "<th>" + nroCuota + "</th>";
    fila += "<td>" + "fecha" + "</td>";
    fila += "<td>" + typeof  pagoProgramado.toFixed(3) + "</td>";
    fila += "<td>" + "pagoAdi" + "</td>";
    fila += "<td>" + "Seguros" + "</td>";
    fila += "<td>" + "pagoTotal" + "</td>";
    fila += "<td>" + interesDeCuota.toFixed(3) + "</td>";
    fila += "<td>" + interesAcumulado.toFixed(3) + "</td>";
    fila += "<td>" + pago.toFixed(3) + "</td>";
    fila += "<td>" + deuda.toFixed(3) + "</td>";
    fila += "</tr>";

    document.getElementById('filas').insertRow(-1).innerHTML = fila;
   console.log(fila);
    fila = "";


    console.log(nroCuota + "\t\t" + interesDeCuota.toFixed(3) + "  \t\t" + interesAcumulado.toFixed(3) + "\t\t" + pago.toFixed(3) + "\t\t\t" + pagoProgramado.toFixed(3) + "\t\t\t" + deuda.toFixed(3));
    interesDeCuota = deuda*(interesPorCuota/100);
    nroCuota++;
}
