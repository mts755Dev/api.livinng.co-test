import { convertDate } from "./convertDate.js";

export const generateOfferAcceptedEmail = (reservationFound, rol) => {
    let name;
    if (rol === "host") name = reservationFound.Client.name;
    if (rol === "client") name = reservationFound.Host.name;
    const initialDate = convertDate(reservationFound.dates[0])
    const finalDate = convertDate(reservationFound.dates[1])
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Tu oferta ha sido aceptada!!</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">¡Hola ${name}!</h1>
            <p style="color: #666666;">Tu oferta para el alojamiento ${reservationFound.accommodation.name} en las fechas del ${initialDate} al ${finalDate}</p>
            <p style="color: #666666;">Por un valor de ${reservationFound.price} por noche, ha sido aceptada, tines 24 horas para realizar el pago al enlace que llegara a tu correo</p>
            <p style="color: #666666;">Puedes hacer clic aquí <a href="https://livinng.co">aquí</a> para gestionar tus reservas.</p>
          </div>
        </body>
        </html>
    `;
};

export const generateContraofferEmail = (reservationFound) => {
    const initialDate = convertDate(reservationFound.dates[0])
    const finalDate = convertDate(reservationFound.dates[1])
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Has recibido una contraoferta!!</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">¡Hola ${reservationFound.Client.name}!</h1>
            <p style="color: #666666;">Has recibido una contraoferta para el alojamiento ${reservationFound.accommodation.name} en las fechas del ${initialDate} al ${finalDate}</p>
            <p style="color: #666666;">El nuevo precio propuesto por el anfitrion es de ${reservationFound.price} por noche, recuerda que tienes 24 horas para aceptar la oferta</p>
            <p style="color: #666666;">Puedes hacer clic aquí <a href="https://livinng.co">aquí</a> para gestionar tus reservas.</p>
        </div>
        </body>
        </html>
        `;
}
export const generateReservationEmail = (accommodationFound, clientFound, initialDate, finalDate, contact, offer) => {

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Haz recibido una nueva oferta!!</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333;">¡Hola ${accommodationFound.host.name}!</h1>
        <p style="color: #666666;">Recibiste una nueva oferta de ${clientFound.name} para el alojamiento ${accommodationFound.name} en las fechas del ${convertDate(initialDate)} al ${convertDate(finalDate)}</p>
        <p style="color: #666666;">La oferta es para ${contact.name} por un valor de ${offer.price} por noche, recuerda que tienes 24 horas para aceptar la oferta o hacer una contraoferta</p>
        <p style="color: #666666;">Puedes hacer clic aquí <a href="https://dashboard.livinng.co">aquí</a> para gestionar tus reservas.</p>
      </div>
    </body>
    </html>
    `;
}
export const sendConfirmationEmailReminder = (reservationFound, rol) => {
    const initialDate = convertDate(reservationFound.dates[0])
    const finalDate = convertDate(reservationFound.dates[1])
    if (rol === "client") {
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Recuerda que tienes una oferta pendiente</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">¡Hola ${reservationFound.Host.name}!</h1>
            <p style="color: #666666;">Recuerda que recibiste una oferta de ${reservationFound.Client.name} para el alojamiento ${reservationFound.accommodation.name} en las fechas del ${initialDate} al ${finalDate}</p>
            <p style="color: #666666;">La oferta es para ${reservationFound.name} por un valor de ${reservationFound.price} por noche.</p>
            <p style="color: #666666;">Puedes hacer clic aquí <a href="https://dashboard.livinng.co">aquí</a> para gestionar tus reservas.</p>
        </div>
        </body>
        </html>
        `;
    }
    if (rol === "host") {
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Recuerda que tienes una oferta pendiente</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">¡Hola ${reservationFound.Client.name}!</h1>
            <p style="color: #666666;">Recuerda que recibiste una oferta de ${reservationFound.Host.name} para el alojamiento ${reservationFound.accommodation.name} en las fechas del ${initialDate} al ${finalDate}</p>
            <p style="color: #666666;">La oferta es para ${reservationFound.name} por un valor de ${reservationFound.price} por noche.</p>
            <p style="color: #666666;">Puedes hacer clic aquí <a href="https://dashboard.livinng.co">aquí</a> para gestionar tus reservas.</p>
        </div>
        </body>
        </html>
        `;
    }
}