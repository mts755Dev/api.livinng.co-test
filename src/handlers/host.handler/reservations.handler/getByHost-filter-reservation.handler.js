import getByHostAndFilter from "../../../controllers/host/reservations/getByHost-Filter.js"

export const getByHostAndFilterHandler = async (req, res) => {
    const data = req.body
    try {
        const reservations = await getByHostAndFilter(data)
        if (reservations.error) return res.status(404).send(reservations.error)
        if (reservations.msg) return res.status(200).send(reservations.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}