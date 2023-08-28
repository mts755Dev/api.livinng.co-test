import getAllReservations from "../../../controllers/client/reservations/getAllClientReservations.js";
import { prisma } from "../../../db.js";

export const getReservationClientIdHandler = async (req, res) => {
  try {
    const client = await prisma.client.findFirst({
      where: {
        email: req.usuario.email
      }
    })
    const reservations = await getAllReservations(client.id);
    console.log(reservations)
    if (reservations.error) return res.status(404).send(reservations.error)
    return res.status(200).send(reservations.msg)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


