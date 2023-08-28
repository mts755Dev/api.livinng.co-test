import { prisma } from "../../db.js"

const putAccommodation = async (body) => {
    const { name, guests, description, images, bathrooms, rooms, id, beds, distribution, location, services, price, type, size } = body

    let update = {}

    if (guests) {
        if (typeof guests !== 'number') return { error: `guests tiene que ser un numero` }
        update.guests = guests
    }
    if (price) {
        if (typeof price !== 'number') return { error: `price tiene que ser un numero` }
        update.price = price
    }
    if (bathrooms) {
        if (typeof bathrooms !== 'number') return { error: `bathrooms tiene que ser un numero` }
        update.bathroom = bathrooms
    }
    if (rooms) {
        if (typeof rooms !== 'number') return { error: `rooms tiene que ser un numero` }
        update.rooms = rooms
    }
    if (beds) {
        if (typeof beds !== 'number') return { error: `beds tiene que ser un numero` }
        update.beds = beds
    }
    if (description) {
        if (typeof description !== 'string') return { error: `La descripcion tiene que ser string` }
        update.description = description
    }
    if (distribution) {
        if (typeof distribution !== 'string') return { error: `La distribucion tiene que ser string` }
        update.distribution = distribution
    }
    if (location) {
        if (typeof location !== 'string') return { error: `La location tiene que ser string` }
        update.location = location
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
                NOT: {
                    id: body.id,
                }
            },
        });
        if (existingName) return { error: `Ya existe un alojamiento con nombre '${body.name}' ya existe, ingresar otro nombre.` };
        update.name = name
    }

    if (type) {
        if (typeof body.type !== 'string') return { error: `Type tiene que ser un string` }
        const existingType = await prisma.types.findFirst({
            where: {
                name: body.type,
            },
        });
        if (!existingType) {
            let allTypes = await prisma.types.findMany()
            allTypes = allTypes.map(elem => elem.name)
            return { error: `El type "${type}"no existe, los existentes son "${allTypes}"` };
        }
        update.typeId = type
    }

    if (size) {
        if (typeof body.size !== 'string') return { error: `Size tiene que ser un string` }
        const existingSize = await prisma.size.findFirst({
            where: {
                name: body.size,
            },
        });
        if (!existingSize) {
            let allSize = await prisma.size.findMany()
            allSize = allSize.map(elem => elem.name)
            return { error: `El type "${size}" no existe, los existentes son "${allSize}"` };
        }
        update.sizeId = size
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
        update.services = services
        update.services = { connect: update.services.map(elem => { return { name: elem } }) }
    }
    if (images) {
        if(Array.isArray(images)){
            update.image = images
        }else{
            update.image = [images]
        }
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