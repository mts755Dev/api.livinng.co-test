import { prisma } from '../../../db.js';
import formattedAcc from "../../../utils/accommodation/formattedAcc.js"

const accFilter = async (body) => {
    const { type, size, services, rating, disabled, search, host } = body

    if (search === null || search && typeof search !== 'string') return { error: `search tiene que ser un string` }
    if (disabled === null || disabled && typeof disabled !== 'boolean') return { error: `disabled tiene que ser true o false` }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(host)) return { error: `el id del host tiene que ser de tipo UUID` }

    let seach = ''
    if(search) seach = search 

    const hostFound = await prisma.host.findFirst({ where: { id: host } })
    if (!hostFound) return { error: `No existe host con id ${type}` }

    if (type === null || type && typeof type !== 'string') return { error: `type tiene que ser un string` }
    if (size === null || size && typeof size !== 'string') return { error: `size tiene que ser un string` }
    if (rating === null || rating && typeof rating !== 'number') return { error: `rating tiene que ser un numero` }
    if (rating < 0 || rating > 5) return { error: `rating tiene que ser un numero entre 0 y 5` }
    if (services) {
        if (!Array.isArray(services)) return { error: `Services tiene que ser un array de strings` }
        if (!services.length) return { error: `Services no puede ser un array vacio` }
        let errorServices = []
        services.forEach(elem => {
            if (typeof elem !== 'string') errorServices.push({ error: `service ${elem} no es valido, ejemplo: ["TV","Wifi"]` })
        })
        if (errorServices[0]) return errorServices[0]

        for (const elem of services) {
            const serviceFound = await prisma.services.findFirst({ where: { name: elem } });
            if (!serviceFound) {
                errorServices.push({ error: `No se encuentra el service ${elem}` });
            }
        }
        if (errorServices[0]) return errorServices[0]
    }


    const typeFound = await prisma.types.findFirst({ where: { name: type } })
    if (!typeFound) return { error: `No existe type ${type}` }

    const sizeFound = await prisma.size.findFirst({ where: { name: size } })
    if (!sizeFound) return { error: `No existe size ${size}` }


    const accFound = await prisma.accommodation.findMany({
        where: {
            hostId: host,
            disabled,
            OR: [
                {
                    name: {
                        contains: seach,
                        mode: 'insensitive',
                    },
                },
                {
                    location: {
                        contains: seach,
                        mode: 'insensitive',
                    },
                },
            ],
            size: {
                name: size
            },
            typeId: type,
            services: {
                some: {
                    name: {
                        in: services
                    }
                }
            }
        },
        include: {
            services: true,
            size: true,
            type: true,
            host: true,
            Review: true,
        }
    })

    if (!accFound.length) return { error: `No se encontraron hospedajes con esos requisitos` }

    let formatted = await formattedAcc("FILTRO", accFound)

    if (services) {
        const servicesFound = await prisma.services.findMany({
            where: {
                name: {
                    in: services
                }
            }
        })
        const allServicesArray = servicesFound.map(elem => elem.name);

        formatted = formatted.filter(elem => {
            return allServicesArray.every(service => elem.services.includes(service))
        })
        if (!formatted.length) return { error: `No se encontraron hospedajes con esos services` }
    }

    formatted = await formattedAcc('MUCHOS', formatted)


    if (rating || rating === 0) {
        if (rating === 0) {
            const formattedFilter = formatted.filter(elem => elem.rating >= rating + 0.01 && elem.rating <= rating + 0.99)

            if (!formattedFilter.length) return { error: `No se encontraron Hospedajes con rating ${rating}` }

            return { msg: formattedFilter }
        }
        const formattedFilter = formatted.filter(elem => elem.rating >= rating && elem.rating <= rating + 0.99)

        if (!formattedFilter.length) return { error: `No se encontraron Hospedajes con rating ${rating}` }

        return { msg: formattedFilter }
    }

    return { msg: formatted }
}

export default accFilter