const useFormatDate = () => {
    return (date) => {
        let day = date.substring(8,10);
        let month = date.substring(5, 7);
        let year = date.substring(0,4);
        
        const transcribeMonth = (month) => {
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            
            return months[parseInt(month) + 1];
        }

        let compressedDate = [day, month, year].join('/');
        let completeDate = `${day} de ${transcribeMonth(month)} de ${year}`;

        return { compressedDate, completeDate };
    }
}

export default useFormatDate;