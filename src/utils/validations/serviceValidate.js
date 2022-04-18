export default function serviceValidate(values) {
    let errors = {};

    if (!values.icon) errors.icon = "Ingrese un ícono";
    if (!values.title) errors.title = "Ingrese un nombre";
    if (!values.description) errors.description = "Ingrese una descripción"
    if (!values.price) errors.price = "Se necesita un precio";
    else if (values.price < 0) errors.price = "Ingrese un precio válido";

    return errors;
}