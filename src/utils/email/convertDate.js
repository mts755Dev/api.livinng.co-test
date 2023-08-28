//convierte fechas a formato 15 de agosto del 2023
export const convertDate = (date) => {
    const dateObj = new Date(date)
    const day = dateObj.getDate();
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const getDate = `${day} de ${month} del ${year}`;
    return getDate
}