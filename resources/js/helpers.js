export function getColorBrightness(color) {

   // Variables for red, green, blue values
   let r, g, b, hsp;

   // Check the format of the color, HEX or RGB?
   if (color.match(/^rgb/)) {

       // If RGB --> store the red, green, blue values in separate variables
       color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

       r = color[1];
       g = color[2];
       b = color[3];
   }
   else {

       // If hex --> Convert it to RGB: http://gist.github.com/983661
       color = +("0x" + color.slice(1).replace(
       color.length < 5 && /./g, '$&$&'));

       r = color >> 16;
       g = color >> 8 & 255;
       b = color & 255;
   }

   // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
   hsp = Math.sqrt(
   0.299 * (r * r) +
   0.587 * (g * g) +
   0.114 * (b * b)
   );

   // Using the HSP value, determine whether the color is light or dark
   if (hsp>127.5)
    return 1
   return 0
}

export function printElement(id, title = 'Raspored') {
    let contents = document.getElementById(id).outerHTML;
    if(window.innerWidth > 768) {
      let frame1 = document.createElement('iframe');
      frame1.name = "frame1";
      frame1.style.position = "absolute";
      frame1.style.top = "-1000000px";
      frame1.style.width = "1920px";
      document.body.appendChild(frame1);
      let frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
      frameDoc.document.open();
      frameDoc.document.write(`<html><head><title>${title}</title>`);
      frameDoc.document.write('<style>* {font-family: "Helvetica", sans-serif; } svg { display: none } .text-center {text-align: center;} table {border-collapse:collapse;width: 100%;} thead td {font-weight: bold;}</style></head><body>');
      frameDoc.document.write(contents);
      frameDoc.document.write('</body></html>');
      frameDoc.document.close();
      setTimeout(function () {
          window.frames["frame1"].focus();
          window.frames["frame1"].print();
          document.body.removeChild(frame1);
      }, 500);
      return false;
  } else {
    var printWindow = window.open('', '', 'height=200,width=1920');
    printWindow.document.write('<html><head><title>Table Contents</title>');

    //Print the Table CSS.
    printWindow.document.write('<style>* {font-family: "Helvetica", sans-serif; } svg { display: none } .text-center {text-align: center;} table {border-collapse:collapse;width: 100%;} thead td {font-weight: bold;}</style>')
    printWindow.document.write('</head>');

    //Print the DIV contents i.e. the HTML Table.
    printWindow.document.write('<body>');
    var divContents = contents;
    printWindow.document.write(divContents);
    printWindow.document.write('</body>');

    printWindow.document.write('</html>');
    printWindow.document.close();
    printWindow.print();
  }
}
