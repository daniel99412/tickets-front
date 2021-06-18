// Calidad - - - - - - Atencion - - - - - - Velocidad - - - - - - Porcentaje
// Alta - - - - - - Alta - - - - - - Alta - - - - - - 50
// Alta - - - - - - Alta - - - - - - Media - - - - - - 45
// Alta - - - - - - Alta - - - - - - Baja - - - - - - 40
// Alta - - - - - - Media - - - - - - Alta - - - - - - 45
// Alta - - - - - - Media - - - - - - Media - - - - - - 40
// Alta - - - - - - Media - - - - - - Baja - - - - - - 35
// Alta - - - - - - Baja - - - - - - Alta - - - - - - 40
// Alta - - - - - - Baja - - - - - - Media - - - - - - 35
// Alta - - - - - - Baja - - - - - - Baja - - - - - - 30

// Media - - - - - - Alta - - - - - - Alta - - - - - - 40
// Media - - - - - - Alta - - - - - - Media - - - - - - 35
// Media - - - - - - Alta - - - - - - Baja - - - - - - 30
// Media - - - - - - Media - - - - - - Alta - - - - - - 30
// Media - - - - - - Media - - - - - - Media - - - - - - 25
// Media - - - - - - Media - - - - - - Baja - - - - - - 24
// Media - - - - - - Baja - - - - - - Alta - - - - - - 23
// Media - - - - - - Baja - - - - - - Media - - - - - - 20
// Media - - - - - - Baja - - - - - - Baja - - - - - - 22

// Baja - - - - - - Alta - - - - - - Alta - - - - - - 24
// Baja - - - - - - Alta - - - - - - Media - - - - - - 20
// Baja - - - - - - Alta - - - - - - Baja - - - - - - 17
// Baja - - - - - - Media - - - - - - Alta - - - - - - 17
// Baja - - - - - - Media - - - - - - Media - - - - - - 15
// Baja - - - - - - Media - - - - - - Baja - - - - - - 13
// Baja - - - - - - Baja - - - - - - Alta - - - - - - 10
// Baja - - - - - - Baja - - - - - - Media - - - - - - 8
// Baja - - - - - - Baja - - - - - - Baja - - - - - - 1


export function trapecioAbiertoDerecha(u: any, a: any, b: any): any {

  let res = 5.5;

  if (u > b)
    res = 1.0;
  else if (u < a)
    res = 0.0;
  else if (a <= u && u <= b)
    res = (u - a) / (b - a);
  return res;
}

export function trapecioAbiertoIzquierda(u: any, a: any, b: any): any {

  let res = 5.5;

  if (u > b)
    res = 0.0;
  else if (u < a)
    res = 1.0;
  else if (a <= u && u <= b)
    res = (b - u) / (b - a);

  return res;
}

export function triangular(u: any, a: any, b: any, c: any): any {

  let res = 5.5;

  if (u < a || u > c)
    res = 0.0;
  else if (a <= u && u < b)
    res = (u - a) / (b - a);
  else if (b <= u && u <= c)
    res = (c - u) / (c - b);

  return res;
}

	export function maximo(a: any, b: any): any {
  let res = 5.5;

  if (a > b)
    res = a;
  else
    res = b;

  return res;
}

export function getCalidad(a: any): any {
  let aux;
  let aux1;
  let aux2;
  let aux3;
  let resultado = "";

  aux1 = trapecioAbiertoIzquierda(a,  0.0, 35.0);
  aux2 = trapecioAbiertoDerecha(a, 70.0, 100.0);
  aux3 = triangular(a, 12.5, 47.5, 85.0);

  aux = maximo(maximo(aux1, aux3), aux2);

  if (aux == aux1)
    resultado = "Baja";
  else if (aux == aux2)
    resultado = "Alta";
  else if (aux == aux3)
    resultado = "Media";

  return resultado;
}

export function getAtencion(l: any): any {
  let aux;
  let aux1;
  let aux2;
  let aux3;
  let resultado = "";

  aux1 = trapecioAbiertoIzquierda(l, 0.0, 35.0);
  aux2 = trapecioAbiertoDerecha(l, 70.0, 100.0);
  aux3 = triangular(l, 12.5, 47.5, 85.0);

  aux = maximo(maximo(aux1, aux3), aux2);

  if (aux == aux1)
    resultado = "Bajo";
  else if (aux == aux2)
    resultado = "Alto";
  else if (aux == aux3)
    resultado = "Medio";

  return resultado;
}

export function getVelocidad(t: any): any {
  let aux;
  let aux1;
  let aux2;
  let aux3;
  let resultado = "";

  aux1 = trapecioAbiertoIzquierda(t, 0.0, 35.0);
  aux2 = trapecioAbiertoDerecha(t, 70.0, 100.0);
  aux3 = triangular(t, 12.5, 47.5, 85.0);

  aux = maximo(maximo(aux1, aux3), aux2);

  if (aux == aux1)
    resultado = "Poco";
  else if (aux == aux2)
    resultado = "Mucho";
  else if (aux == aux3)
    resultado = "Normal";

  return resultado;
}

export function getBeca(cal: any, ate: any, vel: any): any {
  let resp;
  let aux;
  let aux1;
  let aux2;

  if (cal == "Alta")
    aux = 1;
  else if (cal == "Media")
    aux = 2;
  else if (cal == "Baja")
    aux = 3;
  else
    aux = 0;

  if (ate == "Alto")
    aux1 = 1;
  else if (ate == "Medio")
    aux1 = 2;
  else if (ate == "Bajo")
    aux1 = 3;
  else
    aux1 = 0;

  if (vel == "Mucho")
    aux2 = 1;
  else if (vel == "Normal")
    aux2 = 2;
  else if (vel == "Poco")
    aux2 = 3;
  else
    aux2 = 0;

  switch (aux) {
    case 1:
      switch (aux1) {
        case 1:
          switch (aux2) {
            case 1:
              resp = 50;
              break;

            case 2:
              resp = 45;
              break;

            case 3:
              resp = 40;
              break;

            default:
              resp = 1
              break;
          }
          break;

        case 2:
          switch (aux2) {
            case 1:
              resp = 45;
              break;

            case 2:
              resp = 40;
              break;

            case 3:
              resp = 35;
              break;

            default:
              resp = 0
              break;
          }
          break;

        case 3:
          switch (aux2) {
            case 1:
              resp = 40;
              break;

            case 2:
              resp = 35;
              break;

            case 3:
              resp = 30;
              break;

            default:
              resp = 1
              break;
          }
          break;

        default:
          resp = 1
          break;
      }
      break;

    case 2:
      switch (aux1) {
        case 1:
          switch (aux2) {
            case 1:
              resp = 40;
              break;

            case 2:
              resp = 35;
              break;

            case 3:
              resp = 30;
              break;

            default:
              resp = 1
              break;
          }
          break;

        case 2:
          switch (aux2) {
            case 1:
              resp = 30;
              break;

            case 2:
              resp = 25;
              break;

            case 3:
              resp = 24;
              break;

            default:
              resp = 1
              break;
          }
          break;

        case 3:
          switch (aux2) {
            case 1:
              resp = 23;
              break;

            case 2:
              resp = 20;
              break;

            case 3:
              resp = 22;
              break;

            default:
              resp = 1;
              break;
          }
          break;

        default:
          resp = 1
          break;
      }
      break;

    case 3:
      switch (aux1) {
        case 1:
          switch (aux2) {
            case 1:
              resp = 24;
              break;

            case 2:
              resp = 20;
              break;

            case 3:
              resp = 17;
              break;

            default:
              resp = 1
              break;
          }
          break;

        case 2:
          switch (aux2) {
            case 1:
              resp = 17;
              break;

            case 2:
              resp = 15;
              break;

            case 3:
              resp = 13;
              break;

            default:
              resp = 1
              break;
          }
          break;

        case 3:
          switch (aux2) {
            case 1:
              resp = 10;
              break;

            case 2:
              resp = 8;
              break;

            case 3:
              resp = 1;
              break;

            default:
              resp = 1
              break;
          }
          break;

        default:
          resp = 1
          break;
      }
      break;

    default:
      resp = 1
      break;
  }

  return resp;
}

export function getTickets(tickets: any): any {

  let porcentajeTickets;

  if (tickets >= 0 && tickets < 25) {
    porcentajeTickets = 50
  }
  else if (tickets >= 26 && tickets <= 49) {
    porcentajeTickets = 25
  } else {
    porcentajeTickets = 15
  }

  return porcentajeTickets;
}

 export function fuzzyLogic(calidad: any, atencion: any, velocidad: any, tickets: any): any {

   let porcentajeEvalucaciones = getBeca(getCalidad(calidad), getAtencion(atencion), getVelocidad(velocidad));

   let porcentajeTickets = getTickets(tickets);

   let porcentaje = (porcentajeEvalucaciones + porcentajeTickets) / 100;

   return porcentaje;

}
