import orderAccommodation from "../../../controllers/user/accommodations/orderAccommodation.js";

const orderAccommodationHandler = async (req, res, next) => {
    if (req.body.order) {
        const { order } = req.body;
        try {
            const orderAcc = await orderAccommodation(order);
            if (orderAcc.error) return res.status(404).send(orderAcc.error)
            return res.status(201).send(orderAcc.msg)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    next()
}
export default orderAccommodationHandler