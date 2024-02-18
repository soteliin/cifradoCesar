import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-descifrador',
  templateUrl: './descifrador.component.html',
  styleUrls: ['./descifrador.component.css']
})
export class DescifradorComponent {
  //1
  mensajeCifrado !: String;
  mensajeCifrado2 !: String;
  mensajeDescifrado !: String;
  mejorDescifrado !: String;
  llavePosible !: String;

  llave !: number;
  letra !: String;
  caracter !: number;
  //1a
  latin1Characters: string[] = ["\u0000", "\u0001", "\u0002", "\u0003", "\u0004", "\u0005", "\u0006", "\u0007", "\u0008", "\u0009", "\u000A", "\u000B", "\u000C", "\u000D", "\u000E", "\u000F", "\u0010", "\u0011", "\u0012", "\u0013", "\u0014", "\u0015", "\u0016", "\u0017", "\u0018", "\u0019", "\u001A", "\u001B", "\u001C", "\u001D", "\u001E", "\u001F", " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\u007F", "\u0080", "\u0081", "\u0082", "\u0083", "\u0084", "\u0085", "\u0086", "\u0087", "\u0088", "\u0089", "\u008A", "\u008B", "\u008C", "\u008D", "\u008E", "\u008F", "\u0090", "\u0091", "\u0092", "\u0093", "\u0094", "\u0095", "\u0096", "\u0097", "\u0098", "\u0099", "\u009A", "\u009B", "\u009C", "\u009D", "\u009E", "\u009F", "\u00A0", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "\u00AD", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

  ngOnInit(): void {
    this.mensajeCifrado = "";
    this.llave = 0;

  }


  //2
  descifrarMensaje(form: NgForm): void {
    this.mejorDescifrado = "";
    this.llavePosible = "";
    this.mensajeDescifrado="";
    //2a
    for (let i = 0; i < this.mensajeCifrado.length; i++) {
      this.letra = this.mensajeCifrado.charAt(i);
      //2b
      for (let j = 0; j < this.latin1Characters.length; j++) {
        let asc = this.latin1Characters[j];
        //2c
        if (this.letra == asc) {
          //2d
          if (j != 32) {
            let descifradoAscii = (j - this.llave) % 256;
            //2e
            if (descifradoAscii < 0) {
              descifradoAscii += 256;
              this.mensajeDescifrado += this.latin1Characters[descifradoAscii];
              //2f
            } else {
              this.mensajeDescifrado += this.latin1Characters[descifradoAscii];
            }
          }else{
            this.mensajeDescifrado+=" ";
          }
        }
      }
    }
  }



//3
  descifrarMensajeSinLlave(form: NgForm): void {
    this.mensajeDescifrado = "";
    this.llavePosible = "Posible mejor llave: ";
    //3a
    let mejorPuntuacion = -Infinity; 
    let mejorLlave = 0;
    //3b
    for (let k = 1; k < 256; k++) { 
      this.mensajeDescifrado = "";
      //3c
      for (let i = 0; i < this.mensajeCifrado2.length; i++) {
        this.letra = this.mensajeCifrado2.charAt(i);
        //3d
        for (let j = 0; j < this.latin1Characters.length; j++) {
          const ascii = this.latin1Characters[j];
          //3e
          if (this.letra == ascii) {
            //3f
            if (j != 32) {
              let descifradoAscii = (j - k) % 256; 
              //3g
              if (descifradoAscii < 0) {
                descifradoAscii += 256;
              }
              this.mensajeDescifrado += this.latin1Characters[descifradoAscii];
              //3h
            } else {
              this.mensajeDescifrado += this.mensajeCifrado2[i];
            }
          }
        }
      }
      console.log(this.mensajeDescifrado);
      //3i
      let puntuacion = this.calcularPuntuacion(this.mensajeDescifrado);
      // 3j
      if (puntuacion > mejorPuntuacion) {
        console.log(puntuacion);
        mejorPuntuacion = puntuacion;
        this.mejorDescifrado = this.mensajeDescifrado;
        mejorLlave = k;
      }

    }
    //3k
    this.llavePosible = "Posible mejor llave:" + mejorLlave;
    console.log("Mensaje descifrado con la mejor llave (" + mejorLlave + "):");
    console.log(this.mejorDescifrado);
  }

  //4
  calcularPuntuacion(mensaje: String): number {
    // 4a
    mensaje = mensaje.toLowerCase();
    // 4b
    // const frecuenciaLetrasEspañol = {
    //     'a': 12.53, 'b': 1.42, 'c': 4.68, 'd': 5.86, 'e': 13.68, 'f': 0.69, 'g': 1.01, 'h': 0.70,
    //     'i': 6.25, 'j': 0.44, 'k': 0.02, 'l': 4.97, 'm': 3.15, 'n': 6.71, 'ñ': 0.31, 'o': 8.68, 'p': 2.51,
    //     'q': 0.88, 'r': 6.87, 's': 7.98, 't': 4.63, 'u': 3.93, 'v': 0.90, 'w': 0.01, 'x': 0.22, 'y': 0.90, 'z': 0.52
    // };
    const frecuenciaLetrasEspañol = {
      'a': 12.53, 'e': 13.68, 'i': 6.25, 'o': 8.68, 'u': 3.93
    };

   
    let puntuacionTotal = 0;

    // 4c
    for (let i = 0; i < mensaje.length; i++) {
      const letra = mensaje[i];
      // 4d
      if (letra in frecuenciaLetrasEspañol) {
        puntuacionTotal += frecuenciaLetrasEspañol[letra as keyof typeof frecuenciaLetrasEspañol];
      }
    }
    //4e
    return puntuacionTotal;
  }
}
