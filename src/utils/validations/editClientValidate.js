const editClientValidate = (values) => {
    let errors = {};

    if (!values.address) errors.address = "Se necesita una dirección";
    if (!values.email.trim())
        errors.email = "Se necesita un correo";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.—]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "La dirección de correo no es válida";
    if (!values.phone) errors.phone = "Se necesita un celular";
    if (!values.password) errors.password = "Se necesita una contraseña";
    else if (!values.password.length < 6) 
        errors.password = "La contraseña debe contener al menos 6 carácteres";

    return errors;
}

export default editClientValidate;