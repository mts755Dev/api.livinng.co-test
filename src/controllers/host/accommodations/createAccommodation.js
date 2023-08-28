import { prisma } from "../../../db.js";


const normalizeCase = (str) => {
  const wordsToExclude = ["de", "la", "el", "los", "las", "lo", "con","en", "y", "o"];
  const words = str.toLowerCase().split(" ");

  for (let i = 0; i < words.length; i++) {
    if (!wordsToExclude.includes(words[i]) || i === 0) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
  }
  return words.join(" ");
};

const createAccommodation = async (body) => {
    const { name, guests, image ,address, description, rooms, id, beds, distribution, location, services, price} = body

    if (!name || !image|| !price || !guests || !body.bathrooms || !description || !rooms || !beds || !distribution || !location || !body.type || !body.size || !body.host || !services ) return { error: 'Faltan datos' }

    body.name = normalizeCase(name);
    body.location = normalizeCase(location);

    if (id) return { error: `El id es autoincremental no hace falta pasarle uno` }
    if (typeof name !== 'string') return { error: `El nombre tiene que ser un string` }
    if (!Array.isArray(services)) return { error: `Services tiene que ser un array de strings` }

    const existingAcc = await prisma.accommodation.findFirst({
        where: {
            name: name,
        },
    });
    if (existingAcc) {
        return { error: `Hospedaje con nombre ${name} ya existe` };
    }

    const existingUser = await prisma.host.findFirst({
        where: {
            id: body.host,
        },
    });

    if (!existingUser) {
        return { error: `No existe un usuario con id ${body.host} en la base de datos` };
    }

     let errorImagesn = []
     image.forEach(elem => {
         if (typeof elem !== 'string') errorImagesn.push({ error: `No es valida la imagesn con URL:${elem}` })
     })
     if (errorImagesn[0]) return errorImagesn[0]

    if (typeof guests !== 'number') return { error: `guests tiene que ser un numero` }
    if (typeof price !== 'number') return { error: `price tiene que ser un numero` }
    if (typeof body.bathrooms !== 'number') return { error: `bathrooms tiene que ser un numero` }
    if (typeof rooms !== 'number') return { error: `rooms tiene que ser un numero` }
    if (typeof beds !== 'number') return { error: `beds tiene que ser un numero` }
    if (typeof description !== 'string') return { error: `La descripcion tiene que ser string` }
    if (typeof distribution !== 'string') return { error: `La distribucion tiene que ser string` }
    if (typeof location !== 'string') return { error: `La location tiene que ser string` }
    if (typeof body.host !== 'string') return { error: `El id del host tiene que ser de tipo UUID` }

    if (typeof body.size !== 'string') return { error: `Size tiene que ser un string` }
    if (typeof body.type !== 'string') return { error: `Type tiene que ser un string` }


    let errorServices = []
    services.forEach(elem => {
        if (typeof elem !== 'string') errorServices.push({ error: `El id "${elem}" de services no es valido, ejemplo: "TV"` })
    })

    if (errorServices[0]) return errorServices[0]

    for (const elem of services) {
        const serviceFound = await prisma.services.findFirst({ where: { name: elem } });
        if (!serviceFound) {
            errorServices.push({ error: `No se encuentra el service ${elem}` });
        }
    }

    if (errorServices[0]) return errorServices[0]

    const typeFound = await prisma.types.findFirst({ where: { name: body.type } })
    if (!typeFound) return { error: `No existe type ${body.type}` }


    body.services = { connect: body.services.map(elem => { return { name: elem } }) }

    const { type, size, host,bathrooms, ...newBody } = body
    newBody.typeId = type
    newBody.sizeId = size
    newBody.hostId = host
    newBody.bathroom = bathrooms
    body = newBody



    await prisma.accommodation.create({
        data: body,

    })

    return { msg: `Hospedaje ${name} Creado correctamente` }
}

export default createAccommodation
