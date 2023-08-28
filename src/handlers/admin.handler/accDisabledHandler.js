import getAccDisabledTrue from '../../controllers/admin/getAccDisabledTrue.js';


export const getAccDisabledHandler = async (req,res) =>{
  try {
    const allAccDisabled = await getAccDisabledTrue();
    if (allAccDisabled.error)
      return res.status(404).send(allAccDisabled.error);
    return res.status(200).send(allAccDisabled.msg);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

