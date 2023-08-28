
const validateAccBody = (acc) => {
    const expectedKeys = {
        id,
        name,
        image,
        guests,
        bathroom,
        description,
        rooms,
        beds,
        distribution,
        location,
        typeId,
        sizeId,
        services,
        userId,
    };

    for (const key in expectedKeys) {
        if (acc[key] === undefined) {
            return { error: `Key '${key}' is required` };
        }
    }
    return { data: true };
}

export default validateAccBody;