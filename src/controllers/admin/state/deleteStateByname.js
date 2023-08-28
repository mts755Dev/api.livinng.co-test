import { prisma } from "../../../db.js"

const deleteStateByname = async (name) => {
    if(!name) return {error:'Ingrese un name'}
    const stateFond = await prisma.state.findUnique({
        where:{
            name
        }
    })
    if(!stateFond) return {error:`El estado con el name ${name} no existe`}
    await prisma.state.delete({
        where:{
            name
        }
    })
    return {msg:'Estado eliminado exitosamente'}
}
export default deleteStateByname