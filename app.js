const express = require('express');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer'); // Para manejar la carga de archivos

const app = express();

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT;


const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}



const client = new Client({
  puppeteer: {
     // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    handleSIGINT: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  authStrategy: new LocalAuth({ clientId: "Client-one" }),
  // webVersionCache: {
  //   type: 'remote',
  //   remotePath: 'https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/2.2413.51-beta-alt.html' // Tried 2.2412.54 still same result
  // }
});



process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
})


client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});




client.on('authenticated', (session) => {
  console.log('Conexión exitosa');
  sessionData = session;
  if (sessionData) {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});




 //onst mediaFilemp3 = MessageMedia.fromFilePath(`./public/media/${'1.pm3'}`)
  const mediaFilemp4 = MessageMedia.fromFilePath(`./public/media/${'1.mp3'}`)
//const mediaFilepdf = MessageMedia.fromFilePath(`./public/media/${'CATÁLOGO_ABRIL .pdf'}`)


let MSGbien = null; // inicia el Mensaje de bienvenida
let etapa = 0;

const registro = {}; // Registra los numeros telefono que inician al programa 


client.on('message', async (message) => {
  
  //console.log(`Mensaje recibido de ${message.from}: ${message.body}`);

  client.sendMessage( message.from, '*¡Hola!* 👋 Gracias por comunicarte con *John Store.* 🍿🎬 recuerda que esta linea es solo de información. \n\n⬇ Aquí te dejo un número para que puedas contactarnos:\n\n\n*Ventas #1*📲 https://wa.me/573132502527\n\n\nUno de nuestros asesores 👩🏼‍💻👨🏽‍💻 te ayudará con tu requerimiento. 📞 *TE ESPERAMOS*' )

  client.sendMessage(message.from, mediaFilemp4)


  // setInterval(() => {
  //   console.log('Registros', registro);
  // }, 180000);


 // Este codigo verifica que ya se envio el mensaje de bienvenida

  if (!registro[message.from]) {

  //   client.sendMessage( message.from, '*¡Hola!* 👋 Gracias por comunicarte con *John Store.* 🍿🎬 recuerda que esta linea es solo de información. \n\n⬇ Aquí te dejo un número para que puedas contactarnos:\n\n\n*Ventas #1*📲 https://wa.me/573132502527\n\n\nUno de nuestros asesores 👩🏼‍💻👨🏽‍💻 te ayudará con tu requerimiento. 📞 *TE ESPERAMOS*' )

  // client.sendMessage(message.from, mediaFilemp4)


    registro[message.from] = { etapa: 0, numeroDocumento: '' };


    return;
  }

  if (MSGbien !== null) { // Check if MSGbien exists
    client.sendMessage(message.from, MSGbien);
    MSGbien = null; // Reset to a falsy value after sending
  } else {
    //console.log('Error al verificar el mensaje de bienvenida');
  }







  // switch (registro[message.from].etapa) {



  //   case 0:

  //     if (!(message.body.includes("1") || message.body.includes("1") || message.body.includes("2")) && message.body !== '2') {
  //       //client.sendMessage(message.from, mediaFilemp3)
  //       client.sendMessage(message.from, 'Por favor escribe 1 o 2 para continuar.');
  //     } else if (message.body.includes("1")) {
  //       //client.sendMessage(message.from, mediaFilemp4)
        
  //       client.sendMessage(message.from, 'Para continuar con su soporte de Netflix por favor dar clip en el link https://wa.me/573234917466');
  //       registro[message.from].etapa = 100;
  //       delete registro[message.from];
  //     } else if (message.body === '2') {
        
  //       client.sendMessage(message.from, 'Para continuar con su soporte de otras plataformas  por favor dar clip en el link https://wa.me/573234850021');
  //       registro[message.from].etapa = 100;
  //       delete registro[message.from];
  //     }
  //     break;


  //   case 13:
  //     if (!(message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no")) {
  //       client.sendMessage(message.from, 'Por favor escribe si o no para continuar.');
  //     } else if (message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no") {
  //       const fileName3 = `${message.from}.json`;
  //       if (fs.existsSync(fileName3)) {
  //         // Cargar el archivo JSON
  //         const data = fs.readFileSync(fileName3, 'utf8');
  //         let jsonData = JSON.parse(data);

  //         // Actualizar la etapa en el registro
  //         registro[message.from].etapa = 20;

  //         // Agregar información según la respuesta
  //         if (message.body.toLowerCase() === "si") {
  //           jsonData.sintomas = "" + message.body;
  //         } else {
  //           jsonData.sintomas = "No tiene sintomas.";
  //         }

  //         // Guardar los cambios en el archivo JSON
  //         fs.writeFileSync(fileName3, JSON.stringify(jsonData));

  //         console.log('Guardado', 'Se ha guardado la información correctamente.');
  //       } else {
  //         console.log('Guardado', 'No se ha guardado la información correctamente.');
  //       }
  //       client.sendMessage(message.from, 'Se ha realizado alguno de estos exámenes\n\n✳️ Endoscopia \n\n✳️ Prueba de aliento para Helicobacter pylori \n\n✳️ Análisis de sangre\n\nEscriba *SI o NO*');
  //     }
  //     break;




  //     case 20:
  //       if (!(message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no")) {
  //         client.sendMessage(message.from, 'Por favor escribe si o no para continuar.');
  //       } else if (message.body.toLowerCase() === "si" ) {
  //         const fileName = `${message.from}.json`;
  //       if (fs.existsSync(fileName)) {
  //         // Cargar el archivo JSON
  //         const data = fs.readFileSync(fileName, 'utf8');
  //         let jsonData = JSON.parse(data);

  //         // Actualizar la etapa en el registro
  //         registro[message.from].etapa = 21;

  //         // Agregar información según la respuesta
  //         if (message.body.toLowerCase() === "si") {
  //           jsonData.examenRealizado = "" + message.body;
  //         } else {
  //           jsonData.examenRealizado = "No tiene examenes.";
  //         }

  //         // Guardar los cambios en el archivo JSON
  //         fs.writeFileSync(fileName, JSON.stringify(jsonData));

  //         console.log('Guardado', 'Se ha guardado la información correctamente.');
  //       } else {
  //         console.log('Guardado', 'No se ha guardado la información correctamente.');
  //       }
  //     }
  //       if (message.body.toLowerCase() === 'si') {
  //         client.sendMessage(message.from, 'Prioriza tu salud con nuestros tratamiento, garantizando una recuperación pronta. \n\nNuestros tratamientos oxilan, en un precio entre 199.000 y 499.999! \n\nRecupera tu bienestar y vive mejor. ¿Deseas continuar?\n\nEscriba *SI o NO*');
  //       } 
  //       break;



  //     case 21:
  //       if (!(message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no")) {
  //         client.sendMessage(message.from, 'Por favor escribe si o no para continuar.');
  //       } else if (message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no") {
  //         const fileName = `${message.from}.json`;
  //         if (fs.existsSync(fileName)) {
  //           // Cargar el archivo JSON
  //           const data = fs.readFileSync(fileName, 'utf8');
  //           let jsonData = JSON.parse(data);
  
  //           // Actualizar la etapa en el registro
  //           registro[message.from].etapa = 22;
  
  //           // Agregar información según la respuesta
  //           if (message.body.toLowerCase() === "si") {
  //             jsonData.examenRealizado = message.body;
  //             jsonData.telefono = message.from;
  //           } else {
  //             jsonData.examenRealizado = "No se ha realizado ningún examen.";
  //           }
  
  //           // Guardar los cambios en el archivo JSON
  //           fs.writeFileSync(fileName, JSON.stringify(jsonData));
  
  //           console.log('Guardado', 'Se ha guardado la información correctamente.');
  //         } else {
  //           console.log('Guardado', 'No se ha guardado la información correctamente.'); 
  //         }
  //         if (message.body.toLowerCase() === 'si') {
  //         client.sendMessage(message.from, 'Para Agendar la cita por favor escribe en un solo mensaje \n\nNombre \n\nOcupación \n\n Edad \n\nCiudad \n\nNúmero de Teléfono ');
  //       } else if (message.body.toLowerCase() === 'no') {
  //         client.sendMessage(message.from, 'La medicina homeopática puede mejorar su salud, lo(a) invitamos a leer esta información.')
  //         client.sendMessage(message.from, mediaFilepdf)
  //       }
  //     }
  //       break;
  


  //       case 22:
  //         if (message.body.length > 5) {
  //           const fileName = `${message.from}.json`;
  //           if (fs.existsSync(fileName)) {
  //             // Cargar el archivo JSON
  //             const data = fs.readFileSync(fileName, 'utf8');
  //             let jsonData = JSON.parse(data);
        
  //             // Actualizar la etapa en el registro
  //             registro[message.from].etapa = 23;
        
  //             // Guardar la respuesta en el JSON
  //             jsonData.respuesta = message.body;
        
  //             // Guardar los cambios en el archivo JSON
  //             fs.writeFileSync(fileName, JSON.stringify(jsonData));
        
  //             console.log('Guardado', 'Se ha guardado la información correctamente.');
  //           } else {
  //             console.log('Guardado', 'No se ha guardado la información correctamente.');
  //           }
  //           client.sendMessage(message.from, '¡Gracias por tu tiempo y confianza! Estamos aquí para ayudarte en tu camino hacia la salud digestiva. \n\nPronto recibirá una llamada');
            
  //           const fileName2 = `${message.from}.json`;

  //           // Verificar si el archivo existe
  //           if (fs.existsSync(fileName2)) {
  //             // Cargar el archivo JSON
  //             const data = fs.readFileSync(fileName2, 'utf8');
  //             const jsonData = JSON.parse(data);

  //             const jsonString = JSON.stringify(jsonData, null, 2);
            
  //             // Utilizar el contenido del archivo JSON en otro lugar
  //             // Por ejemplo, imprimirlo en la consola
  //             // console.log(jsonData);
              
  //             client.sendMessage('573204037757c.us', jsonString);

  //           } else {
  //             console.log('El archivo no existe.');
  //           }
          
  //         }


  //         break;
  



  // }


});




// Desde aqui inica el cargue de la imagen al servidor 

// Configura multer para guardar las imágenes en la carpeta "media"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media'); // Directorio de destino para las imágenes
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo como "image" y asegúrate de que sea único
    const extname = path.extname(file.originalname);
    const filename = 'image' + extname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Verifica si el archivo ya existe en "media" y lo elimina si es necesario
    const filePath = path.join('media', 'image' + path.extname(file.originalname));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    cb(null, true);
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Mostrar un mensaje emergente en HTML
  const successMessage = `
    <div id="popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); text-align: center;">
      <p>Imagen cargada con éxito</p>
      <button onclick="closePopup()">Cerrar</button>
    </div>
    <script>
      function closePopup() {
        document.getElementById('popup').style.display = 'none';
        // Redirige de nuevo a la página anterior
        window.location.href = '/'; // Cambia esto al URL de tu página
      }
    </script>
  `;
  res.send(successMessage);
});


// 



let MSGenvio = true;




// Desde aqui Robot de envio Mesivo

client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});


client.on('ready', () => {
  console.log('Cliente listo');
});

client.initialize();


app.use(bodyParser.json()); // Usar body-parser para analizar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Usar body-parser para analizar datos codificados en URL

// Array para almacenar los registros de mensajes enviados
const registros = [];

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
//  });


app.post('/procesar', (req, res) => {
  const { numbers, messages } = req.body;

  console.log('Números de Teléfono:', numbers);
  console.log('Mensajes:', messages);

  if (!numbers || !messages) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }

  if (!Array.isArray(numbers) || !Array.isArray(messages)) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }


  const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`)
    client.sendMessage(to, mediaFile)
  }


  // ///////////////////////////////////////

  let messageCounter = 0;



  app.post('/cambiar', (req, res) => {
    MSGenvio = !MSGenvio; // Cambiamos el valor de MSGenvio
    res.json({ MSGenvio });
  });





  setInterval(() => {
    console.log("MSGenvio:", MSGenvio);
  }, 1000);


  app.use(express.json());

  // ///////////////////////////////////////////////////////////////


  numbers.forEach((phoneNumber, index) => {
    const phoneNumberWithSuffix = `${phoneNumber}@c.us`;
    const message = messages[index] || ""; // Asigna una cadena vacía si el mensaje no está presente para ese número



    setTimeout(() => {

      if (MSGenvio) {
        sendMedia(phoneNumberWithSuffix, 'image.jpg');
      }
      client.sendMessage(phoneNumberWithSuffix, message)
        .then(() => {
          const registro = {
            mensaje: `Mensaje ${++messageCounter} enviado a ${phoneNumberWithSuffix}`,
            numero: phoneNumberWithSuffix
          };

          registros.push(registro); // Agregar el registro al array de registros
          console.log(registro.mensaje.green);

          // Verifica si estás en el último elemento del array
          if (index === numbers.length - 1) {
            registros.push({ mensaje: 'Terminé de enviar los mensajes', numero: 'Oprima el boton borra registro' });
            console.log('Terminé de enviar');
          }
        })
        .catch((error) => {
          console.log(`Error al enviar el mensaje a ${phoneNumberWithSuffix}: ${error.message}`.red);
        });
    }, 15000 * (index + 1));
  });




  res.status(200).send('Datos recibidos correctamente');


  app.get('/registros', (req, res) => {
    const ultimosRegistros = registros.slice(-10); // Obtener los últimos 10 registros

    res.json(ultimosRegistros); // Enviar los últimos 10 registros como respuesta en formato JSON
  });

});

// Ruta para borrar los registros
app.delete('/borrar-registros', (req, res) => {
  registros.length = 0; // Borra todos los registros
  res.json({ message: 'Registros borrados exitosamente' });
});






app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});