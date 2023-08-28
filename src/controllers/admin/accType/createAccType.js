import { prisma } from "../../../db.js"


const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


const createAccType = async (body) => {
    const acctype = body.acctype
    if (!Array.isArray(acctype)) return { error: 'Formato no valido, ejemplo: {acctype:["Cabaña", "Casa", "Apartamento"]}' }
    if (!acctype.length) return { error: `acctype no puede no contener elementos, acctype: ${acctype}` }
  
    for (let i = 0; i < acctype.length; i++) {
      let aux = capitalizeFirstLetter(acctype[i])
      const existingacctype = await prisma.types.findFirst({
        where: {
          name: aux,
        },
      });
      if (existingacctype) {
        continue
      }
      await prisma.types.create({
        data: {
          name: aux
        }
      })
    }
  
    return { msg: `acctype ${acctype} Creado correctamente` }
  }

export default createAccType
