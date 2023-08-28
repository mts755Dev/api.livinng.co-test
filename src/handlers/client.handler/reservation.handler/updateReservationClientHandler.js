import updateReservations from "../../../controllers/client/reservations/updateReservations.js";

export const updateReservationClientHandler = async (req, res) => {
    const data = req.body
   
    try {
        const reservations =  await updateReservations(data)
        if(reservations.error) return res.status(404).send(reservations.error)
        if(reservations.msg) return res.status(200).send(reservations.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
