# LDAW-Tutti-Frutti

¡Hola!

Este proyecto fue hecho en Node.js y React.js.

## Consideraciones

El juego está en inglés, por lo que las palabras ingresadas deben estar en inglés.

## Instalar

Para instalar las dependencias abre una consola en la carpeta principal y ejecuta este comando:

```
cd tutti-frutti-back && npm install && cd ../tutti-frutti-front && npm install
```

Además deberás crear un archivo llamado ".env" en el subdirectorio tutti-frutti-back que contenga la información incluida en el archivo ".env.example" del mismo directorio.

## Ejecutar

Para correr el proyecto necesitas dos terminales abiertas en la carpeta principal del proyecto.

En la una de ellas ingresa el siguiente comando

```
cd tutti-frutti-back && npm start
```

En la segunda ejecuta el siguiente comando:

```
cd tutti-frutti-front && npm start
```

## Reglas

1. Los jugadores escriben una palabra comenzando por la letra que el juego indica.
2. Cuando un jugador acabe, presiona el botón "STOP".
3. El sistema puntúa de acuerdo a los siguientes criterios:
    1. La primer letra de la palabra debe coincidir con la letra que el sistema escogió.
    2. Si al menos dos jugadores escogen la misma palabra, se le dará ventaja a quien presionó el botón de "STOP" primero.

_@DavidGomezChiu_