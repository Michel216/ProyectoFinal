function formatFecha(fecha) {
    const date = new Date(fecha);
    const offset = date.getTimezoneOffset(); // obtén el offset en minutos
    date.setMinutes(date.getMinutes() + offset); // ajusta la fecha

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("es-ES", options);
}