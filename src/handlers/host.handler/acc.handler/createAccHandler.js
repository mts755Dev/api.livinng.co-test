import createAccommodation from "../../../controllers/host/accommodations/createAccommodation.js";

export const createAccHandler = async (req, res) => {
  const info = req.body
  let uri = req.body.uri

  let image = uri;
  let { price, name, guests, description, rooms, beds, distribution, location, address, size, host, type, services, bathrooms } = info.form
  try {
    const body = { price, name, image, guests, description, rooms, beds, distribution, address, location, size, host, type, services, bathrooms }

    const createAcc = await createAccommodation(body);
    if (createAcc.error) return res.status(404).send(createAcc.error);
    return res.status(200).send(createAcc.msg);


  } catch (error) {
    return res.status(400).send(error.message);
  }
};
