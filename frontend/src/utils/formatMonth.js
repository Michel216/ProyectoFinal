export function formatMonth(TheDate) {
    const date = new Date(TheDate);
    const offset = date.getTimezoneOffset(); // obtén el offset en minutos
    date.setMinutes(date.getMinutes() + offset); // ajusta la fecha

    const options = {
        month: "long"
    };

    // Obtén el mes en formato largo y asegúrate de que la primera letra sea mayúscula
    const month = date.toLocaleString("es-ES", options);
    return month.charAt(0).toUpperCase() + month.slice(1);
}