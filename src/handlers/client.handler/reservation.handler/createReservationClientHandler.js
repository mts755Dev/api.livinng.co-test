import createReservations from "../../../controllers/client/reservations/createReservations.js"


export const createReservationClientHandler = async (req, res) => {
    const data = req.body
    try {
        if(req.body.id) throw new Error('El id no debe ingresar por body en la ruta post')
        const reservations = await createReservations(data, req.usuario.email)
        if(reservations.error) return res.status(404).send(reservations.error)
        if(reservations.msg) return res.status(200).send(reservations.msg)

    } catch (error) {
        return res.status(500).send('Error reservations handler: '+ error.message)
    }
}
