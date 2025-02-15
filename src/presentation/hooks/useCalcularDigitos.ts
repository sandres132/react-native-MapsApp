

export const UseCalcularDigitos = (num : number) => {

    let residuo = 0;
    const d = 10;
    let cont = 1;

    if ( (residuo = num / d) > 10 ) {
        residuo = num / d;
        cont++;
    }

    while(residuo>10){
        residuo = residuo / d;
        cont++;
    }
    
    return {
        //Properties
        residuo,
        cont,

    }
}