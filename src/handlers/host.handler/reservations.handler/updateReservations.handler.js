import updateReservations from "../../../controllers/host/reservations/updateReservations.js";

 export const updateReservationsHandler = async(req, res) =>{
    const data = req.body
    try {
        const update = await updateReservations(data);
        if(update.error) return res.status(404).send(update.error);
        if(update.msg) return res.status(200).send(update.msg);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
