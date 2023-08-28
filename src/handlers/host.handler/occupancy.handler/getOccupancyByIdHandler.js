import getOccupancyById from "../../../controllers/host/occupancy/getOccupancyById.js";

export const getOccupancyByIdHandler = async (req, res) => {
    const { accommodationId } = req.params
    try {
        const getAcc = await getOccupancyById(accommodationId);
        if (getAcc.error) return res.status(404).send(getAcc.error)
        return res.status(200).json(getAcc)
    } catch (error) {
        return res.status(500).send(error.message)
    }

}