const formattedAcc = (get, data) => {

    if (typeof data === "object" && !Array.isArray(data)) {
        data = [data]
    }
    const formattedAccommodations = data.map((elem) => {
        let totalRating = 0
        if (elem.Review) {
            elem.Review.forEach((elem) => totalRating += elem.Rating)
        }
        return {
            ...elem,
            type: elem.type.name,
            size: elem.size.name,
            services: elem.services.map((service) => service.name),
            rating: totalRating !== 0 && totalRating / elem.Review.length || elem.rating || 0
        }
    });

    if (get === 'UNO' || get === 'FILTRO') {
        const formatted = formattedAccommodations.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                price: elem.price,
                rating: elem.rating,
                image: elem.image,
                guests: elem.guests,
                bathroom: elem.bathroom,
                description: elem.description,
                rooms: elem.rooms,
                beds: elem.beds,
                distribution: elem.distribution,
                location: elem.location,
                type: elem.type,
                size: elem.size,
                services: elem.services,
                review: elem.Review,
                address:elem.address,
                host: {
                    id: elem.host.id,
                    name: elem.host.name,
                }
            }
        })
        if (get === 'UNO') return formatted[0]

        return formatted
    }
    if (get === 'MUCHOS') {
        const formatted = formattedAccommodations.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                price: elem.price,
                rating: elem.rating,
                image: elem.image,
                location: elem.location,
                address:elem.address
            }
        })



        return formatted
    }

    if (get === 'ACCBYHOST') {
        const formatted = formattedAccommodations.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                price: elem.price,
                rating: elem.rating,
                guests: elem.guests,
                image: elem.image,
                location: elem.location,
                type: elem.type,
                disabled: elem.disabled,
                address:elem.address
            }
        })
        return formatted
    }

}

export default formattedAcc
