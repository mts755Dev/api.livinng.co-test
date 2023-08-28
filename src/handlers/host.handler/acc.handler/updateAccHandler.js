import putAccommodation from "../../../controllers/host/accommodations/putAccommodation.js";

export const updateAccHandler = async (req, res) => {
  let {address,price,name,image,guests,description,beds,services,id,disabled}= req.body;
  let uri = req.body.uri;
  if (!image) image = [];

  if(uri){
  for (let i = 0; i < uri.length; i++) {image.push(uri[i])}
}
const body = {address,price,name,image,guests,description,beds,services, id,disabled};
  try {
      const updateAcc = await putAccommodation(body);
      if (updateAcc.error) return res.status(400).send(updateAcc.error);
      return res.status(200).send(updateAcc.msg);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
