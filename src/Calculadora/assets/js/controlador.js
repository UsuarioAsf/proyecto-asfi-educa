


let v_monto = 0;
let v_moneda = ""; //Bs.   $
let v_interes = 0; //float
let v_plazo = 0;    //int
let v_formaPago = "";  //  M  T  S
let v_periodoGracia = 0;
let v_seguroDesgravamen = 0;  //float
let v_tipoCuota = "";   //  F  V
let v_pagoAdicional = 0;  // int

let nroCuota = 0;

function verificarPanel1() {
   let x = document.querySelector('#Monto');
   let y = document.querySelector('#plazo_año');
   let z = document.querySelector('#plazo_mes');
   let t = document.querySelector('#tasa');

   if (x.value == '') {

      document.getElementById('Monto').style.borderColor = '#FF5733';
      // asasas
      document.querySelector('#tituloMonto').style.display = "block";
      document.querySelector('#tituloMonto').innerText = ("Debes ingresar un monto");
      return false;
   } else {
      document.querySelector('#tituloMonto').style.display = "none";
      if (y.value == '' && z.value == '') {
         document.querySelector('#tituloPlazo').style.display = "block";
         document.querySelector('#tituloPlazo').innerText = ("Debes ingresar un plazo");
         return false;
      }
      if (y.value != '') y.style.borderColor = '#2ECC71';
      if (z.value != '') z.style.borderColor = '#2ECC71';
      x.style.borderColor = '#2ECC71';
      document.querySelector('#m_moneda').style.borderColor = '#2ECC71';
      t.style.borderColor = '#2ECC71';
      document.getElementById('span1_pg1').innerHTML = (t.value + " %");
      //document.getElementById('sp1').innerHTML = "Ok";
      //document.getElementById('sp1').style.color = '#2ECC71';
      document.getElementById('cont1').style.visibility = "visible";


      return true;
   }

}

function ocultar_mostrar() {
   var x = document.getElementById("services");
   // var x = document.getElementById("myDIV");
   if (x.style.display === "none") {
      x.style.display = "block";
   } else {
      x.style.display = "none";
   }

}

function envio1() {

   // mostrar pg2
   var panel2 = document.getElementById("pg2");
   if (panel2.style.display === "none") {
      panel2.style.display = "block";
      //document.getElementById("cont4").style.display = "block";
   }

   // fin mostrar pg2




   let x = document.querySelector('#Monto').value;
   let y = document.querySelector('#m_moneda').value;
   let z = document.querySelector('#tasa').value;

   document.getElementById('dato1').innerHTML = x;
   if (y == "Bs.") document.getElementById('dato1').innerHTML = "Bs. " + x;
   if (y == "$") document.getElementById('dato1').innerHTML = x + " $";

   document.getElementById('dato3').innerHTML = parseFloat("0" + z) + "  %";
   let v1 = parseInt("0" + document.querySelector('#plazo_año').value) * 12;
   let v2 = parseInt("0" + document.querySelector('#plazo_mes').value);
   document.getElementById('dato4').innerHTML = (v1 + v2) + " Meses";
   document.getElementById('dato5').innerHTML = "(Equivalente a " + ((v1 + v2) / 12).toFixed(2) + " años)";


   //variables numericas
   v_monto = parseInt(x);
   if (y == "Bs.") v_moneda = y;
   if (y == "$") v_moneda = y;

   v_interes = parseFloat("0" + z);
   v_plazo = v1 + v2;


}

function envio2() {






   let x = "";
   let y = document.querySelector('#txtPeriodoGracia').value;   //periodo de gracia
   let z = document.querySelector('#txtSeguroDes').value;   //desgravamen
   let j = "";   //tipo de cuota
   let k = document.querySelector('#txtPagoAdicional').value;   //pago adicional
   console.log("periodo  " + y);
   if (y < 0 || y > 6 || z < 0 || z > 100 || k < 0 || k > v_monto) return false;

   if (document.getElementById('tipoP_1').checked) x = "Mensual";
   if (document.getElementById('tipoP_2').checked) x = "Trimestral";
   if (document.getElementById('tipoP_3').checked) x = "Semestral";

   document.getElementById('dato6').innerHTML = x;

   document.getElementById('dato7').innerHTML = y + " Meses";
   document.getElementById('dato8').innerHTML = z + " %";



   // variables:
   v_formaPago = x[0] + "";
   v_periodoGracia = parseInt("0" + y);
   v_seguroDesgravamen = parseFloat("0" + z);
   v_pagoAdicional = parseInt("0" + k);

   // pagos adicionales
   document.getElementById('dato9').innerHTML = v_pagoAdicional;

   // mostrar pg3
   var panel3 = document.getElementById("pg3");
   if (panel3.style.display === "none") {
      panel3.style.display = "block";
      //document.getElementById("cont4").style.display = "block";
   }

return true;
}

function verResultados() {




   var panelTabla = document.getElementById("pg5");
   if (panelTabla.style.display === "none") {
      panelTabla.style.display = "block";
   }

   //generarTabla('x', '-1');

}
let vector = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

function generarTabla(linkX) {
   console.log("aquiiii");

   // mostrar panel de resultados
   var panelResultados = document.getElementById("cuadroResult");
   if (panelResultados.style.display === "none") {
      panelResultados.style.display = "block";
      document.getElementById("cont4").style.display = "block";
   }



   // fin panel de resultados


   let l = "";
   let l2 = "";
   let imputX = "";
   console.log("Este es el link " + linkX);
   if (linkX + "" != "x") {
      l = "tablaimp" + linkX;
      imputX = document.getElementById(l).value;
      vector[linkX] = imputX;

      console.log("Este es el valor " + imputX);
   }

   eliminar();
   /*
   v_monto = 1200;
   v_interes = 12;
   v_formaPago = "M";
   v_plazo = 12;
   v_moneda = "Bs.";
   v_pagoAdicional = 10;
   v_periodoGracia = 0;
   v_seguroDesgravamen = 0;
   */


   let fila = "";
   let deuda = v_monto;
   nroCuota = 1;

   let m = [0, 1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];

   let numerodeCuotas = 0;
   let pago = 0;

   let interesPorCuota = 0;
   let interesDeCuota = 0;



   // codigo fechas
   var date = new Date();
   var d = date.getDate();
   var day = d;
   var m1 = date.getMonth() + 1;
   var month = m1;
   var yy = date.getFullYear();
   var year = yy;

   let fechaInicio = day + "/" + month + "/" + year;
   let fechaCuota = "";


   let ayuda1 = "";
   let ayuda2 = "";
   //fin codigo fechas


   if (v_formaPago == "M") {
      interesPorCuota = v_interes / 12;
      pago = deuda / v_plazo;
      document.getElementById("datoR3").innerHTML = (v_plazo);
   }
   if (v_formaPago == "T") {
      interesPorCuota = v_interes / 4;
      pago = (deuda / (v_plazo / 3));
      document.getElementById("datoR3").innerHTML = (v_plazo / 3);
   }
   if (v_formaPago == "S") {
      interesPorCuota = v_interes / 2;
      pago = (deuda / (v_plazo / 6));
      document.getElementById("datoR3").innerHTML = (v_plazo / 6);
   }
   interesDeCuota = deuda * (interesPorCuota / 100);

   let interesAcumulado = 0;
   let pagoProgramado = 0;

   // periodo de gracia
   let interesPeriodoGracia = v_interes / 12;
   interesPeriodoGracia = parseFloat(interesPeriodoGracia.toFixed(2));
   let interesDeCuotaGracia = deuda * (interesPeriodoGracia / 100);

   //seguro desgravamen
   let seguroCuotaDesgravamen = 0;
   let bandera = false;

   // periodo de gracia
   let y = document.querySelector('#txtPeriodoGracia').value;   //periodo de gracia
   v_periodoGracia = parseInt("0" + y);

   while (deuda > 0) {
      seguroCuotaDesgravamen = deuda * (v_seguroDesgravamen / 100);

      // descuento por pagos adicionales fijos
      deuda = deuda - v_pagoAdicional;

      // descuento pagos extraordinarios
      if (vector[nroCuota - 1] != "") {
         deuda = deuda - parseInt(vector[nroCuota - 1]);
      }





      if (v_periodoGracia > 0) {
         interesAcumulado += interesDeCuotaGracia;

         //fecha
         month = month + 1;
      }
      else {
         if (deuda < pago) {
            pago = deuda;
         }
         // posible error mas adelante
         interesDeCuota = deuda * (interesPorCuota / 100);

         deuda = deuda - pago;
         interesAcumulado += interesDeCuota;
         pagoProgramado = pago + interesDeCuota;


         pagoProgramado = parseFloat(pagoProgramado.toFixed(2));
         interesDeCuota = parseFloat(interesDeCuota.toFixed(2));
         interesAcumulado = parseFloat(interesAcumulado.toFixed(2));
         pago = parseFloat(pago.toFixed(2));
         deuda = parseFloat(deuda.toFixed(2));


         // fechas
         if (v_formaPago == "M") month = month + 1;
         if (v_formaPago == "T") month = month + 3;
         if (v_formaPago == "S") month = month + 6;
      }
      seguroCuotaDesgravamen = parseFloat(seguroCuotaDesgravamen.toFixed(2));

      // inputs
      let inp = "<th scope='col'><input id='tablaimp" + nroCuota + "' placeholder='' class='form-input rounded-pill inputTabla' type='number'></th><th><a id='tablaEnl" + nroCuota + "' href='#pg8' class='btn btn-success btn-circle' style='padding: 1px 5px;' onclick='generarTabla(" + nroCuota + ")'>✓</a></th>";



      // fechas


      if (month > 12) {
         month = month % 12;
         year = year + 1;
      }

      if (day < 10)
         ayuda1 = "0" + day;
      else
         ayuda1 = "" + day;
      if (month < 10)
         ayuda2 = "0" + month;
      else
         ayuda2 = "" + month;



      fechaCuota = ayuda1 + "/" + ayuda2 + "/" + (year - 2000);

      console.log(nroCuota + "  _  " + pagoProgramado + "  _  " + v_pagoAdicional + "  _  " + seguroCuotaDesgravamen);

      if (nroCuota == 1)
         document.getElementById("datoR1").innerHTML = (pagoProgramado + v_pagoAdicional + seguroCuotaDesgravamen).toFixed(2);
      document.getElementById("datoR2").innerHTML = (pagoProgramado + v_pagoAdicional + seguroCuotaDesgravamen).toFixed(2);
      document.getElementById("datoR4").innerHTML = nroCuota;
      document.getElementById("datoR5").innerHTML = interesAcumulado;
      document.getElementById("datoR6").innerHTML = (v_pagoAdicional * nroCuota);

      fila = "<tr>";
      fila += "<th>" + nroCuota + "</th>";
      fila += "<td>" + fechaCuota + "</td>";
      if (v_periodoGracia > 0) fila += "<td>" + "  -  " + "</td>";
      else fila += "<td>" + pagoProgramado + " " + v_moneda + "</td>";
      fila += "<td>" + v_pagoAdicional + " " + v_moneda + "</td>";
      fila += "<td>" + seguroCuotaDesgravamen + "</td>";
      fila += "<td>" + parseFloat((pagoProgramado + v_pagoAdicional + seguroCuotaDesgravamen).toFixed(2)) + "</td>";
      if (v_periodoGracia > 0) fila += "<td>" + parseFloat(interesDeCuotaGracia.toFixed(2)) + "</td>";
      else fila += "<td>" + interesDeCuota + "</td>";
      fila += "<td>" + parseFloat(interesAcumulado.toFixed(2)) + "</td>";
      if (v_periodoGracia > 0) {
         v_periodoGracia--;
         fila += "<td>" + "  -  " + "</td>";
      }
      else fila += "<td>" + pago + "</td>";

      fila += "<td>" + deuda + " " + v_moneda + "</td>";

      fila += inp;

      fila += "</tr>";

      document.getElementById('filas').insertRow(-1).innerHTML = fila;
      fila = "";





      //console.log(nroCuota + "\t\t" + interesDeCuota.toFixed(2) + "  \t\t" + interesAcumulado.toFixed(2) + "\t\t" + pago.toFixed(2) + "\t\t\t" + pagoProgramado.toFixed(2) + "\t\t\t" + deuda.toFixed(2));


      nroCuota++;

   }
   console.log("L: " + l);
   if (linkX + "" != "x") {
      for (let i = 1; i < nroCuota; i++) {
         l = "tablaimp" + i;
         l2 = "tablaEnl" + i;
         if (vector[i] != "") {
            document.getElementById(l).placeholder = vector[i];
            document.getElementById(l).disabled = true;
            document.getElementById(l2).innerHTML = "X";
            document.getElementById(l2).classList.remove('btn-success');
            document.getElementById(l2).classList.add('btn-danger');
         }
      }
   }

}

function eliminar() {
   for (let i = 0; i < nroCuota - 1; i++)
      document.getElementById('filas').deleteRow(0);
}


//validaciones
document.querySelector("#Monto").addEventListener("change", validacionMonto);
document.querySelector("#tasa").addEventListener("change", validacionMonto);
document.querySelector("#plazo_año").addEventListener("change", validacionMonto);
document.querySelector("#plazo_mes").addEventListener("change", validacionMonto);
document.querySelector("#txtPeriodoGracia").addEventListener("change", validacionMonto);
document.querySelector("#txtSeguroDes").addEventListener("change", validacionMonto);
document.querySelector("#txtPagoAdicional").addEventListener("change", validacionMonto);

function validacionMonto() {

   if (this.id == "Monto") {
      let x = document.querySelector('#' + this.id);
      if (x.value != '') {
         if (x.value <= 0 || x.value > 1000000000 || (x.value + "").includes('e')) {
            x.style.borderColor = '#FF5733';
            document.querySelector('#tituloMonto').style.display = "block";
            totalTime = 3;
            cuentaRegresiva1("Monto");

         } else {
            x.style.borderColor = '#2ECC71';
            document.querySelector('#tituloMonto').style.display = "none";
         }
      }
      console.log("llega aqui");
   }
   if (this.id == "tasa") {
      let x = document.querySelector('#' + this.id);
      if (x.value < 0 || x.value > 100) {
         x.style.borderColor = '#FF5733';
         document.querySelector('#titulotasa').style.display = "block";
         totalTime = 3;
         cuentaRegresiva1("tasa");

      } else {
         x.style.borderColor = '#2ECC71';
      }
   }
   if (this.id == "plazo_mes" || this.id == "plazo_año") {
      let x = document.querySelector('#' + this.id);
      if ((this.id == "plazo_mes" && (x.value < 0 || x.value > 12))
         || (this.id == "plazo_año" && (x.value < 0 || x.value > 40))) {
         x.style.borderColor = '#FF5733';
         document.querySelector('#' + 'titulo' + this.id).style.display = "block";
         totalTime = 3;

         if (this.id == "plazo_mes") cuentaRegresiva1('plazo_mes');
         if (this.id == "plazo_año") cuentaRegresiva1('plazo_año');
      } else {
         x.style.borderColor = '#2ECC71';
      }

   }
   if (this.id == "txtPeriodoGracia") {
      let x = document.querySelector('#' + this.id);
      if (x.value < 0 || x.value > 6) {
         x.style.borderColor = '#FF5733';
         totalTime = 3;
         cuentaRegresiva1("txtPeriodoGracia");

      } else {
         x.style.borderColor = '#2ECC71';
      }

   }
   if (this.id == "txtSeguroDes") {
      let x = document.querySelector('#' + this.id);
      if (x.value < 0 || x.value > 100) {
         x.style.borderColor = '#FF5733';
         totalTime = 3;
         cuentaRegresiva1("txtSeguroDes");

      } else {
         x.style.borderColor = '#2ECC71';
      }

   }
   if (this.id == "txtPagoAdicional") {
      let x = document.querySelector('#' + this.id);
      if (x.value < 0) {
         x.style.borderColor = '#FF5733';
         document.querySelector('#titulotxtPagoAdicional').innerText = "Dato no valido";
         totalTime = 3;
         cuentaRegresiva1("txtPagoAdicional");

      } else {
         if (x.value >= v_monto) {
            x.style.borderColor = '#FF5733';
            console.log("Entrooo");
            document.querySelector('#titulotxtPagoAdicional').innerText = "Pago adicional supera la deuda original";
            totalTime = 3;
            cuentaRegresiva1("txtPagoAdicional");
         }
         else
            x.style.borderColor = '#2ECC71';
      }

   }
   console.log("Cambio!!");
}
// cuenta regresiva
var totalTime = 3;
function cuentaRegresiva1(origen) {

   if (totalTime == 0) {
      console.log('Final');
      if (origen == "txtPeriodoGracia") {
         document.querySelector('#titulo' + origen).innerText = "(En Meses)";
      }
      else {
         if (origen == "txtSeguroDes") {
            document.querySelector('#titulo' + origen).innerText = "";
         }
         else
            if (origen == "txtPagoAdicional") {
               document.querySelector('#titulo' + origen).innerText = "";
            }
            else
               document.querySelector('#titulo' + origen).style.display = "none";
      }
      document.querySelector('#' + origen).value = ""
      document.querySelector('#' + origen).style.borderColor = '#8B758B';
   } else {
      console.log("aqui: " + origen);
      totalTime -= 1;
      if (origen == "Monto") {
         document.querySelector('#titulo' + origen).innerText = ("Monto no valido");
         setTimeout("cuentaRegresiva1('Monto')", 1000);
      }
      if (origen == "tasa") {
         document.querySelector('#titulo' + origen).innerText = ("Interes fuera de rango");
         setTimeout("cuentaRegresiva1('tasa')", 1000);
      }
      if (origen == "plazo_mes") {
         document.querySelector('#titulo' + origen).innerText = ("Dato no valido\nRango permitido\n0-12");
         setTimeout("cuentaRegresiva1('plazo_mes')", 1000);
      }
      if (origen == "plazo_año") {
         document.querySelector('#titulo' + origen).innerText = ("Dato no valido\nRango permitido\n0-40");
         setTimeout("cuentaRegresiva1('plazo_año')", 1000);
      }
      if (origen == "txtPeriodoGracia") {
         document.querySelector('#titulo' + origen).innerText = "Rango permitido\n0 - 6";
         setTimeout("cuentaRegresiva1('txtPeriodoGracia')", 1000);
      }
      if (origen == "txtSeguroDes") {
         document.querySelector('#titulo' + origen).innerText = "Rango permitido\n0 - 100";
         setTimeout("cuentaRegresiva1('txtSeguroDes')", 1000);
      }
      if (origen == "txtPagoAdicional") {
         setTimeout("cuentaRegresiva1('txtPagoAdicional')", 1000);
      }
   }
}