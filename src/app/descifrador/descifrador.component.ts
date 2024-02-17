import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-descifrador',
  templateUrl: './descifrador.component.html',
  styleUrls: ['./descifrador.component.css']
})
export class DescifradorComponent {
  mensajeCifrado !: String;
  mensajeCifrado2 !: String;
  mensajeDescifrado !: String;
  mejorDescifrado !: String;
  
  llave !: number;
  letra !: String;
  caracter !: number;
  latin1Characters: string[] = ["\u0000", "\u0001", "\u0002", "\u0003", "\u0004", "\u0005", "\u0006", "\u0007", "\u0008", "\u0009", "\u000A", "\u000B", "\u000C", "\u000D", "\u000E", "\u000F", "\u0010", "\u0011", "\u0012", "\u0013", "\u0014", "\u0015", "\u0016", "\u0017", "\u0018", "\u0019", "\u001A", "\u001B", "\u001C", "\u001D", "\u001E", "\u001F", " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\u007F", "\u0080", "\u0081", "\u0082", "\u0083", "\u0084", "\u0085", "\u0086", "\u0087", "\u0088", "\u0089", "\u008A", "\u008B", "\u008C", "\u008D", "\u008E", "\u008F", "\u0090", "\u0091", "\u0092", "\u0093", "\u0094", "\u0095", "\u0096", "\u0097", "\u0098", "\u0099", "\u009A", "\u009B", "\u009C", "\u009D", "\u009E", "\u009F", "\u00A0", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "\u00AD", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

  ngOnInit(): void {
    this.mensajeCifrado="";
    this.llave=0;
    
  }



  descifrarMensaje(form: NgForm): void {
    this.mensajeDescifrado = "";
    for (let i = 0; i < this.mensajeCifrado.length; i++) {
      let caracterAscii = this.mensajeCifrado.charCodeAt(i);
      this.letra = this.mensajeCifrado.charAt(i);
      //console.log(this.letra);
      for (let j = 0; j < this.latin1Characters.length; j++) {
        const ascii = this.latin1Characters[j];
        if (this.letra == ascii) {
          if ((j >= 65 && j <= 90) ||  // Letras mayúsculas
            (j >= 97 && j <= 122) || // Letras minúsculas
            (j >= 192 && j <= 246) ||
            (j >= 248 && j <= 255)) {
            let descifradoAscii = (j - this.llave) % 256; // Módulo 256 para mantener el resultado en el rango ASCII
            if (descifradoAscii < 0) {
              descifradoAscii += 256; // Manejar números negativos
            }
            this.mensajeDescifrado += this.latin1Characters[descifradoAscii];
          } else {
            this.mensajeDescifrado += this.mensajeCifrado[i]; // Mantener el carácter original
          }
        }
      }
    }
}




descifrarMensajeSinLlave(form: NgForm): void {
  
  let mejorPuntuacion = -Infinity; // Variable para almacenar la mejor puntuación
  let mejorLlave = 0;
  for (let k = 0; k < 256; k++) { // Probar todas las posibles claves (0 a 255)
    this.mensajeDescifrado += "\n";  
    for (let i = 0; i < this.mensajeCifrado2.length; i++) {
          let caracterAscii = this.mensajeCifrado2.charCodeAt(i);
          this.letra = this.mensajeCifrado2.charAt(i);
          for (let j = 0; j < this.latin1Characters.length; j++) {
              const ascii = this.latin1Characters[j];
              if (this.letra == ascii) {
                  if ((j >= 65 && j <= 90) || // Letras mayúsculas
                      (j >= 97 && j <= 122) || // Letras minúsculas
                      (j >= 192 && j <= 246) ||
                      (j >= 248 && j <= 255)) {
                      let descifradoAscii = (j - k) % 256; // Descifrado con la clave actual
                      if (descifradoAscii < 0) {
                          descifradoAscii += 256;
                      }
                      this.mensajeDescifrado += this.latin1Characters[descifradoAscii];
                  } else {
                      this.mensajeDescifrado += this.mensajeCifrado2[i];
                  }
              }
          }
      }
      
      let puntuacion = this.calcularPuntuacion(this.mensajeDescifrado);
      // Actualizar el mejor resultado si es necesario
      if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          this.mejorDescifrado = this.mensajeDescifrado;
          mejorLlave = k;
      }


      console.log("Mensaje descifrado con la mejor llave (" + mejorLlave + "):");
    console.log(this.mejorDescifrado);
  }

}

calcularPuntuacion(mensaje: String): number {
  // Normalizar el mensaje a minúsculas para simplificar la comparación
  mensaje = mensaje.toLowerCase();

  // Frecuencia de las letras en el idioma español (en porcentajes)
  const frecuenciaLetrasEspañol = {
      'a': 12.53, 'b': 1.42, 'c': 4.68, 'd': 5.86, 'e': 13.68, 'f': 0.69, 'g': 1.01, 'h': 0.70,
      'i': 6.25, 'j': 0.44, 'k': 0.02, 'l': 4.97, 'm': 3.15, 'n': 6.71, 'ñ': 0.31, 'o': 8.68, 'p': 2.51,
      'q': 0.88, 'r': 6.87, 's': 7.98, 't': 4.63, 'u': 3.93, 'v': 0.90, 'w': 0.01, 'x': 0.22, 'y': 0.90, 'z': 0.52
  };

  // Puntuación total inicial del mensaje
  let puntuacionTotal = 0;

  // Calcular la puntuación basada en la frecuencia de las letras
  for (let i = 0; i < mensaje.length; i++) {
      const letra = mensaje[i];
      // Verificar si la letra está en el diccionario de frecuencia de letras en español
      if (letra in frecuenciaLetrasEspañol) {
          // Incrementar la puntuación total según la frecuencia de la letra en español
          puntuacionTotal += frecuenciaLetrasEspañol[letra as keyof typeof frecuenciaLetrasEspañol];

      }
  }

  return puntuacionTotal;
}
}
