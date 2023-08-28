import { prisma } from "../../../db.js"

const putAccommodation = async (body) => {
    const { name, guests, description, image,address,  id, beds, services, price, disabled} = body
    let update = {}
    
    if(image && image.length) {update.image = image}

    if(disabled === true || disabled === false){
        if (typeof disabled !== 'boolean') return { error: `disabled tiene que ser true o false` }
        update.disabled = disabled
    }
    if (guests) {
        if (typeof guests !== 'number') return { error: `guests tiene que ser un numero` }
        update.guests = guests
    }
    if (price) {
        if (typeof price !== 'number') return { error: `price tiene que ser un numero` }
        update.price = price
    }
    if (beds) {
        if (typeof beds !== 'number') return { error: `beds tiene que ser un numero` }
        update.beds = beds
    }
    if (description) {
        if (typeof description !== 'string') return { error: `La descripcion tiene que ser string` }
        update.description = description
    }
     if (address) {
      if (typeof address !== 'string') return { error: `La address tiene que ser string` }
      update.address = address
  }
    const existingAcc = await prisma.accommodation.findFirst({
        where: {
            id: body.id,
        },
    });
    if (!existingAcc)
        return { error: `El alojamiento con id '${body.id}' no existe. Ingrese un id válido` };

    if (name) {
        if (typeof name !== 'string') return { error: `El nombre tiene que ser un string` }
        const existingName = await prisma.accommodation.findFirst({
            where: {
                name: body.name,
            }
        });
        const accName = await prisma.accommodation.findFirst({
          where: {
            id : body.id
          }
        });
        
        if(existingName){
          if (existingName.name === accName.name) {
            update.name = name
          } else {
            return{error:" este nombre ya existe"}
          }
        }
        update.name = name
    }
    if (services) {
        if (!Array.isArray(services)) return { error: `Services tiene que ser un array de strings` }
        let errorServices = []
        services.forEach(elem => {
            if (typeof elem !== 'string') errorServices.push({ error: `El id "${elem}" de services no es valido, ejemplo: "Tv"` })
        })

        if (errorServices[0]) return errorServices[0]
        for (const service of services) {
            const existingService = await prisma.services.findFirst({
                where: {
                    name: service,
                },
            })
            if (!existingService) {
                let allServices = await prisma.services.findMany()
                allServices = allServices.map(elem => elem.name)
                return { error: `El servicio "${service}" no existe, los existentes son "${allServices}"` };
            }
        }
        await prisma.accommodation.update({
            where: {
              id: body.id
            },
            data: {
              services: {
                set: [], // Establecemos los servicios como un conjunto vacío para desconectar la relación
              },
            },
          });

        update.services = services
        update.services = { connect: update.services.map(elem => { return { name: elem } }) }
    }
    await prisma.accommodation.update({
        where: {
            id
        },
        data: update
    })
    return { msg: 'El alojamiento fue actualizado correctamente' };
}

export default putAccommodation;
