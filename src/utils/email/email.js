import nodemailer from 'nodemailer';

const { EMAIL, PASSWORD } = process.env || 3000;

// ... Tu código existente ...

// Función para enviar el correo electrónico
const sendConfirmationEmail = async (email, subject, emailTemplate) => {
  // // Crea un objeto de transporte reutilizable utilizando el servicio SMTP
  // const transporter = nodemailer.createTransport({
  //   service: 'Outlook', // Aquí puedes especificar el servicio de correo que desees usar (Gmail, Outlook, etc.)
  //   host: 'smtp-mail.outlook.com',
  //   port: 587, // port for secure SMTP
  //   secure: false,
  //   tls: {
  //     ciphers: 'SSLv3'
  //   },
  //   auth: {
  //     user: EMAIL, // Coloca aquí el correo electrónico desde el que enviarás los correos
  //     pass: PASSWORD, // Coloca aquí la contraseña de tu correo electrónico
  //   },
  // });

  // // Contenido del correo electrónico
  // const mailOptions = {
  //   from: EMAIL, // Debe ser el mismo correo especificado en el 'user' del objeto de transporte
  //   to: email, // El correo al que enviarás el mensaje, que es proporcionado como parámetro a la función
  //   subject: subject, // Asunto del correo
  //   html: emailTemplate,
  // };

  // // Envía el correo electrónico
  // await transporter.sendMail(mailOptions);
  console.log('PORT')
};
export { sendConfirmationEmail }