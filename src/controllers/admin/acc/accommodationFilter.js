import { prisma } from '../../../db.js';
import formattedAcc from "../../../utils/accommodation/formattedAcc.js"

const accFilterAdmin = async (body) => {
    const { type, size, services, name, rating, price } = body

    if (!type && !size && !services && !name && !rating && !price){
        const accFound = await prisma.accommodation.findMany({
            include: {
                services: true,
                size: true,
                type: true,
                host: true,
                Review: true,
            }
        })
    
        if (!accFound.length) return { error: `No se encontraron hospedajes en la base de datos` }
    
        let formatted = await formattedAcc("FILTRO", accFound)
        return { msg: formatted }
        }

        if (type === null || type && typeof type !== 'string') return { error: `type tiene que ser un string` }
    if (name === null || name && typeof name !== 'string') return { error: `name tiene que ser un string` }
    if (size === null || size && typeof size !== 'string') return { error: `size tiene que ser un string` }
    if (rating === null || rating && typeof rating !== 'number') return { error: `rating tiene que ser un numero` }
    if (rating < 0 || rating > 5) return { error: `rating tiene que ser un numero entre 0 y 5` }
    if (price) {
        if (!price.min || !price.max) return { error: `Los nombres del objeto de price tienen que ser min y max, y no pueden ser 0` }
        if (typeof price.min !== 'number' || typeof price.max !== 'number') return { error: `min y max tienen que ser numeros` }
        if (price.min > price.max) return { error: `El valor de min no puede ser mayor que el de max` }
    }
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
            price: {
                gte: price?.min,
                lte: price?.max
            },
            OR: [
                {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    },
                },
                {
                    location: {
                        contains: name,
                        mode: 'insensitive',
                    },
                },
            ],
            size: {
                name: size
            },
            type: {
                name: type
            },
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

export default accFilterAdmin