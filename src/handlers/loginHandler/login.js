import createClient from "../../controllers/login/createClient.js";
import { prisma } from "../../db.js";

export const loginHandler = async (req, res) => {
    if(req.usuario && req.usuario.email){
        const userFound = await prisma.client.findFirst({
            where:{
                email:req.usuario.email
            }
        })
        if(userFound){
            return res.status(200).send({name: req.usuario.name})
        }
    }
    try {
        const postUser = await createClient(req.usuario)
        if(postUser.error)return res.status(404).send(postUser.error)
        if(postUser.msg)return res.status(200).send(postUser.msg)
    } catch (error) {
  return res.status(500).send(error.message)
    }
  };