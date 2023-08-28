import createOccupancy from "../../../controllers/host/occupancy/createOccupancy.js";

export const createOccupancyHandler= async(req, res) =>{
    const data = req.body;
    try {
        const create = await createOccupancy(data)
        if(create.error) return res.status(404).send(create.error);
        if(create.msg) return res.status(200).send(create.msg);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}