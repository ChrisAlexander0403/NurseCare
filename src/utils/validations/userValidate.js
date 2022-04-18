export default function userValidate(values){
    let errors = {};
    
    if (!values.firstname.trim())
        errors.firstname = "Se necesita un nombre"
    if (!values.lastname.trim())
        errors.lastname = "Se necesita un apellido"
    if (!values.email.trim())
        errors.email = "Se necesita un correo"
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.—]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "La dirección de correo no es válida"

    if (!values.password)
        errors.password = "Se necesita una contraseña"

    return errors;
}