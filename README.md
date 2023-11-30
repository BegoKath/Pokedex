# Pokedex
## Aplicación utilizando React-Native

Esta aplicación utiliza como base de datos la PokeApi para obtener la información de cada uno de los Pokemon.
Donde se representa Nombre,Peso, Tipo, Habilidades,Movimientos, Espiritus de cada uno de los Pokemon.

En la primera pantalla cuenta con una Lista infinita para el consumo virtualizado de la API, donde se puede dar click en cada uno de los Pokemon para ver su detalle, tambien se implemento el tema claro y oscuro para la satisfación del usuario.



## Utilizacion
## Paso 1: Iniciar el servidor Metro

Primero, necesitarás arrancar **Metro**, el _bundler_ JavaScript que viene _con_ React Native.

Para iniciar Metro, ejecuta el siguiente comando desde la _root_ de tu proyecto React Native:

```bash
# usando npm
npm start

# O usando Yarn
yarn start
```

## Paso 2: Inicia tu aplicación

Deja que Metro Bundler se ejecute en su _propia_ terminal. Abre un _nuevo_ terminal desde la _raíz_ de tu proyecto React Native. Ejecuta el siguiente comando para iniciar tu aplicación _Android_ o _iOS_:

### Para Android

```bash
# usando npm
npm run android

# O usando Yarn
yarn android
```

### Para iOS

```bash
# usando npm
npm run ios

# O usando Yarn
yarn ios
```

Si todo está configurado _correctamente_, debería ver su nueva aplicación ejecutándose en su _Emulador Android_ o _Simulador iOS_ en breve, siempre que haya configurado su emulador/simulador correctamente.

Esta es una forma de ejecutar tu aplicación - también puedes ejecutarla directamente desde Android Studio y Xcode respectivamente.

En tal caso no se este ejecutando la aplicación puede utilizar el siguiente comando para verificar que tenga todos los Requerimientos.
```bash
npx @react-native-community/cli doctor
```
