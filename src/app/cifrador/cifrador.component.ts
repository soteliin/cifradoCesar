import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cifrador',
  templateUrl: './cifrador.component.html',
  styleUrls: ['./cifrador.component.css']
})
export class CifradorComponent {
  mensaje !: String;
  mensajeCifrado !: String;
  letra !: String;
  llave !: number;
  caracter !: number;
  latin1Characters: string[] = ["\u0000", "\u0001", "\u0002", "\u0003", "\u0004", "\u0005", "\u0006", "\u0007", "\u0008", "\u0009", "\u000A", "\u000B", "\u000C", "\u000D", "\u000E", "\u000F", "\u0010", "\u0011", "\u0012", "\u0013", "\u0014", "\u0015", "\u0016", "\u0017", "\u0018", "\u0019", "\u001A", "\u001B", "\u001C", "\u001D", "\u001E", "\u001F", " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\u007F", "\u0080", "\u0081", "\u0082", "\u0083", "\u0084", "\u0085", "\u0086", "\u0087", "\u0088", "\u0089", "\u008A", "\u008B", "\u008C", "\u008D", "\u008E", "\u008F", "\u0090", "\u0091", "\u0092", "\u0093", "\u0094", "\u0095", "\u0096", "\u0097", "\u0098", "\u0099", "\u009A", "\u009B", "\u009C", "\u009D", "\u009E", "\u009F", "\u00A0", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", "\u00AD", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

  ngOnInit(): void {
    this.mensaje = "";
    this.llave = 0;
  }



  cifrarMensaje(form: NgForm): void {
    this.mensajeCifrado = "";
    for (let i = 0; i < this.mensaje.length; i++) {
      let caracterAscii = this.mensaje.charCodeAt(i);
      this.letra = this.mensaje.charAt(i);
      //console.log(this.letra);
      for (let j = 0; j < this.latin1Characters.length; j++) {
        const ascii = this.latin1Characters[j];
        if (this.letra == ascii) {
          if ((j >= 65 && j <= 90) ||  // Letras mayúsculas
            (j >= 97 && j <= 122) || // Letras minúsculas
            (j >= 192 && j <= 246) ||
            (j >= 248 && j <= 255)) {
            let cifradoAscii = (j + this.llave) % 256; // Módulo 256 para mantener el resultado en el rango ASCII
            this.mensajeCifrado += this.latin1Characters[cifradoAscii];
          } else {
            this.mensajeCifrado += this.mensaje[i]; // Mantener el carácter original
          }
        }
      }
    }

  }
}
