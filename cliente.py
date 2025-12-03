import requests
import json

API_URL = 'http://localhost:3000/api/validacion'

def validar_cedula(cedula):
    try:
        response = requests.post(
            f'{API_URL}/cedula',
            json={'cedula': cedula},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            return {'error': f'Error {response.status_code}: {response.text}'}
            
    except requests.exceptions.RequestException as e:
        return {'error': f'Error de conexión: {str(e)}'}

def mostrar_resultado(resultado):
    print('\n' + '='*60)
    
    if 'error' in resultado:
        print(f'ERROR: {resultado["error"]}')
    else:
        estado = 'VÁLIDA' if resultado.get('valido') else 'INVÁLIDA'
        print(f'Estado: {estado}')
        print(f'Mensaje: {resultado.get("mensaje", "")}')
        
        if 'informacion' in resultado and resultado['informacion']:
            info = resultado['informacion']
            print(f'\nCédula formateada: {info.get("cedulaFormateada", "")}')
            print(f'Secuencia: {info.get("secuencia", "")}')
            print(f'Número de documento: {info.get("numeroDocumento", "")}')
            print(f'Dígito verificador: {resultado.get("digitoVerificador", "")}')
            print(f'Dígito calculado: {resultado.get("digitoCalculado", "")}')
    
    print('='*60 + '\n')

def menu():
    print('\n' + '='*60)
    print('  VALIDADOR DE CÉDULA - CLIENTE PYTHON')
    print('='*60)
    print('1. Validar cédula')
    print('2. Validar múltiples cédulas')
    print('3. Probar casos de ejemplo')
    print('4. Salir')
    print('='*60)
    
    opcion = input('\nSeleccione una opción: ')
    return opcion

def probar_ejemplos():
    ejemplos = [
        '00112345678',
        '40212345674',
        '12345678901',
        '001-1234567-8'
    ]
    
    print('\nProbando cédulas de ejemplo...')
    
    for cedula in ejemplos:
        print(f'\nValidando: {cedula}')
        resultado = validar_cedula(cedula)
        mostrar_resultado(resultado)

def main():
    while True:
        opcion = menu()
        
        if opcion == '1':
            cedula = input('\nIngrese el número de cédula: ')
            resultado = validar_cedula(cedula)
            mostrar_resultado(resultado)
            
        elif opcion == '2':
            print('\nIngrese las cédulas a validar (una por línea, línea vacía para terminar):')
            cedulas = []
            while True:
                cedula = input()
                if not cedula:
                    break
                cedulas.append(cedula)
            
            for cedula in cedulas:
                print(f'\nValidando: {cedula}')
                resultado = validar_cedula(cedula)
                mostrar_resultado(resultado)
                
        elif opcion == '3':
            probar_ejemplos()
            
        elif opcion == '4':
            print('\n¡Hasta luego!')
            break
        else:
            print('\nOpción no válida')

if __name__ == '__main__':
    main()