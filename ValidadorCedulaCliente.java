import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

public class ValidadorCedulaCliente {
    
    private static final String API_URL = "http://localhost:3000/api/validacion";
    private static final HttpClient client = HttpClient.newHttpClient();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean continuar = true;
        
        while (continuar) {
            mostrarMenu();
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            switch (opcion) {
                case 1:
                    validarCedula(scanner);
                    break;
                case 2:
                    probarEjemplos();
                    break;
                case 3:
                    continuar = false;
                    System.out.println("\n¡Hasta luego!");
                    break;
                default:
                    System.out.println("\nOpción no válida");
            }
        }
        
        scanner.close();
    }
    
    private static void mostrarMenu() {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  VALIDADOR DE CÉDULA - CLIENTE JAVA");
        System.out.println("=".repeat(60));
        System.out.println("1. Validar cédula");
        System.out.println("2. Probar ejemplos");
        System.out.println("3. Salir");
        System.out.println("=".repeat(60));
        System.out.print("\nSeleccione una opción: ");
    }
    
    private static void validarCedula(Scanner scanner) {
        System.out.print("\nIngrese el número de cédula: ");
        String cedula = scanner.nextLine();
        
        try {
            String jsonBody = String.format("{\"cedula\":\"%s\"}", cedula);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + "/cedula"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
            
            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );
            
            mostrarResultado(response.body());
            
        } catch (Exception e) {
            System.out.println("\n❌ Error: " + e.getMessage());
            System.out.println("Asegúrese de que el servidor esté corriendo en http://localhost:3000");
        }
    }
    
    private static void probarEjemplos() {
        String[] ejemplos = {
            "00112345678",
            "40212345674",
            "001-1234567-8"
        };
        
        System.out.println("\n" + "=".repeat(60));
        System.out.println("PROBANDO EJEMPLOS");
        System.out.println("=".repeat(60));
        
        for (String cedula : ejemplos) {
            System.out.println("\nValidando: " + cedula);
            
            try {
                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(API_URL + "/cedula/" + cedula))
                    .GET()
                    .build();
                
                HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
                );
                
                mostrarResultado(response.body());
                
            } catch (Exception e) {
                System.out.println("❌ Error: " + e.getMessage());
            }
        }
    }
    
    private static void mostrarResultado(String jsonResponse) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("RESULTADO");
        System.out.println("=".repeat(60));
        
        String resultado = extraerValor(jsonResponse, "valido");
        boolean esValida = "true".equals(resultado);
        
        System.out.println("Estado: " + (esValida ? "✓ VÁLIDA" : "✗ INVÁLIDA"));
        System.out.println("Mensaje: " + extraerValor(jsonResponse, "mensaje"));
        
        String cedulaFormateada = extraerValorAnidado(jsonResponse, "informacion", "cedulaFormateada");
        if (cedulaFormateada != null) {
            System.out.println("\nCédula formateada: " + cedulaFormateada);
            System.out.println("Secuencia: " + extraerValorAnidado(jsonResponse, "informacion", "secuencia"));
            System.out.println("Número de documento: " + extraerValorAnidado(jsonResponse, "informacion", "numeroDocumento"));
            System.out.println("Dígito verificador: " + extraerValor(jsonResponse, "digitoVerificador"));
            System.out.println("Dígito calculado: " + extraerValor(jsonResponse, "digitoCalculado"));
        }
        
        System.out.println("=".repeat(60));
    }
    
    private static String extraerValor(String json, String clave) {
        String patron = "\"" + clave + "\":";
        int inicio = json.indexOf(patron);
        if (inicio == -1) return "N/A";
        
        inicio += patron.length();
        int fin = json.indexOf(",", inicio);
        if (fin == -1) fin = json.indexOf("}", inicio);
        
        String valor = json.substring(inicio, fin).trim();
        return valor.replaceAll("\"", "");
    }
    
    private static String extraerValorAnidado(String json, String padre, String hijo) {
        String patronPadre = "\"" + padre + "\":{";
        int inicioPadre = json.indexOf(patronPadre);
        if (inicioPadre == -1) return null;
        
        int finPadre = json.indexOf("}", inicioPadre);
        String subJson = json.substring(inicioPadre, finPadre);
        
        return extraerValor(subJson, hijo);
    }
}