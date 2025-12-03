const ValidadorCedula = require('./validator');

console.log('='.repeat(60));
console.log('PRUEBAS UNITARIAS - VALIDADOR DE CÉDULA');
console.log('='.repeat(60));

const casos = [
  {
    nombre: 'Cédula válida - formato con guiones',
    cedula: '001-1234567-8',
    esperado: true
  },
  {
    nombre: 'Cédula válida - formato sin guiones',
    cedula: '00112345678',
    esperado: true
  },
  {
    nombre: 'Cédula válida - ejemplo 2',
    cedula: '40212345674',
    esperado: true
  },
  {
    nombre: 'Cédula inválida - dígito verificador incorrecto',
    cedula: '00112345679',
    esperado: false
  },
  {
    nombre: 'Cédula inválida - menos de 11 dígitos',
    cedula: '001123456',
    esperado: false
  },
  {
    nombre: 'Cédula inválida - más de 11 dígitos',
    cedula: '001123456789',
    esperado: false
  },
  {
    nombre: 'Cédula inválida - contiene letras',
    cedula: '00112345A78',
    esperado: false
  }
];

let pasadas = 0;
let falladas = 0;

casos.forEach((caso, index) => {
  console.log(`\nPrueba ${index + 1}: ${caso.nombre}`);
  console.log(`Cédula: ${caso.cedula}`);
  
  const resultado = ValidadorCedula.validarCedula(caso.cedula);
  const exito = resultado.valido === caso.esperado;
  
  if (exito) {
    console.log('✓ PASÓ');
    pasadas++;
  } else {
    console.log('✗ FALLÓ');
    console.log(`  Esperado: ${caso.esperado ? 'válida' : 'inválida'}`);
    console.log(`  Obtenido: ${resultado.valido ? 'válida' : 'inválida'}`);
    falladas++;
  }
  
  console.log(`  Mensaje: ${resultado.mensaje || resultado.error}`);
  
  if (resultado.informacion) {
    console.log(`  Formato: ${resultado.informacion.cedulaFormateada}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('RESUMEN DE PRUEBAS');
console.log('='.repeat(60));
console.log(`Total: ${casos.length}`);
console.log(`Pasadas: ${pasadas}`);
console.log(`Falladas: ${falladas}`);
console.log(`Porcentaje de éxito: ${((pasadas / casos.length) * 100).toFixed(2)}%`);
console.log('='.repeat(60));

console.log('\n' + '='.repeat(60));
console.log('PRUEBA DE CÁLCULO DE DÍGITO VERIFICADOR');
console.log('='.repeat(60));

const ejemplosCalculo = [
  { cedula: '0011234567', esperado: 8 },
  { cedula: '4021234567', esperado: 4 },
  { cedula: '0010000000', esperado: 0 }
];

ejemplosCalculo.forEach(ejemplo => {
  const calculado = ValidadorCedula.calcularDigitoVerificador(ejemplo.cedula);
  const exito = calculado === ejemplo.esperado;
  
  console.log(`\nCédula base: ${ejemplo.cedula}`);
  console.log(`Dígito esperado: ${ejemplo.esperado}`);
  console.log(`Dígito calculado: ${calculado}`);
  console.log(exito ? '✓ CORRECTO' : '✗ INCORRECTO');
});

console.log('\n' + '='.repeat(60));