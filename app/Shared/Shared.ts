class Shared{

    public static generateRandomNumber(minValue, maxValue): number {
        let numero = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        numero = numero - (numero % 10);
        if (numero < minValue)
            numero = minValue;
        if (numero > maxValue)
            numero = maxValue;
        return numero;
    }
}