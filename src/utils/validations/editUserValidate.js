export default function editUserValidate(values){
    let errors = {};
    
    if (!values.name.trim())
        errors.name = "Se necesita un nombre";
    if (!values.email.trim())
        errors.email = "Se necesita un correo";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.—]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "La dirección de correo no es válida";
    if (!values.password)
        errors.password = "Se necesita una contraseña";

    return errors;
}