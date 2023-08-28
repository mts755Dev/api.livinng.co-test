import deleteStateByname from "../../../controllers/admin/state/deleteStateByname.js";

export const deleteStateHandler = async(req, res)=>{
    const { name } = req.params;
  try {
    const stateById = await deleteStateByname(name);
    if (stateById.error) return res.status(404).send(stateById.error)
   if(stateById.msg) return res.status(200).json(stateById.msg)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}