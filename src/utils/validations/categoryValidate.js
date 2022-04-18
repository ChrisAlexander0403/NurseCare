export default function logInValidate(values){
    let errors = {};
    
    if (!values.name.trim())
        errors.name = "Se necesita un nombre de categoría"

    if (!values.image)
        errors.password = "Se necesita una imagen de referencia"

    return errors;
}