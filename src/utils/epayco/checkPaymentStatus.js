import { prisma } from '../../db.js';
import axios from 'axios';
import cron from "node-cron";


function normalizeUUID(uuid, removeDashes = true) {
  if (removeDashes) {
    return uuid.replace(/-/g, '');
  } else {
    return uuid.replace(/([\da-f]{8})([\da-f]{4})([\da-f]{4})([\da-f]{4})([\da-f]{12})/, '$1-$2-$3-$4-$5');
  }
}


const checkPaymentStatus = async (req, res) => {
  try {
    const lastToken = await prisma.token.findMany();
    const ultimo = lastToken[lastToken.length - 1];

    const reservations = await prisma.reservations.findMany({
      where: {
        stateId: "Aceptado"
      },

    });
    if (reservations.length > 0) {

      const newReserv = {
        email: reservations.email,
        amount: reservations.total / 2,
        title: reservations.accommodationId,
      };

      const epaycoLink = await prisma.epayco.findMany({
        where: {
          email: newReserv.email,

        }
      });
      if (epaycoLink.length && epaycoLink.email === newReserv.email) {
        const requestData = {
          filter: {
            transactionInitialDate: "2020-01-01 00:00:00",
            transactionEndDate: "2025-11-11 23:59:59",
          },
          pagination: {
            page: 1,
            limit: 50,
          }
        };

        const headers = {
          'Authorization': `Bearer ${ultimo.token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          'https://apify.epayco.co/transaction',
          {
            headers,
            params: requestData,
            timeout: 5000,
          }
          );
          const responseData = response.data.data.data;
        let machados = [] ;
        let occId = [];
          for (let i = 0; i < reservations.length; i++) {
            for (let e = 0; e < responseData.length; e++) {
              if(
                (reservations[i].id.includes("-") ? normalizeUUID(reservations[i].id) : reservations[i].id) === responseData[e].description)
              {
                occId.push(reservations[i].occupancyId)
                machados.push(responseData[e])
              }
              }
          }
          for (let i = 0; i < machados.length; i++) {
            if(machados[i].status === 'Aceptada') {
              await prisma.reservations.update({
                where: {
                  id: normalizeUUID(machados[i].description, false)
                },
                data: {
                  stateId: "Confirmado"
                }
               })
            } if(machados[i].status === 'Cancelada') {
              await prisma.reservations.update({
                where: {
                  id: normalizeUUID(machados[i].description, false)
                },
                data: {
                  stateId: "Rechazado"
                }
              })

            }if(machados[i].status === 'Rechazada') {
              await prisma.reservations.update({
                where: {
                  id: normalizeUUID(machados[i].description, false)

                },
                data: {
                  stateId: "Rechazado"
                }
               })
            }
          }
      return res.status(200).send(responseData)
      }
    } else {
      return res.status(200).send("no hay resultados")
    }
  } catch (error) {
    return res.status(404).send(error.message)
  }
};
 cron.schedule("*/15 * * * *", async () => {
   await checkPaymentStatus();
 });

export default checkPaymentStatus;
