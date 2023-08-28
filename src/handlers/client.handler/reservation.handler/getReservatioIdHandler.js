import getReservationsById from "../../../controllers/client/reservations/getReservationsById.js";

export const getReservatioIdHandler = async (req, res) => {
    const { reservationId } = req.params
    try {
        const reservations = await getReservationsById(reservationId);
        if (reservations.error) return res.status(404).send(reservations.error)
        return res.status(200).send(reservations)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
