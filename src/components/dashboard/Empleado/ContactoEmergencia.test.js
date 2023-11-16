import { validatePhone } from './contactoEmergencia';
test('validatePhone debería validar correctamente los números de teléfono', () => {
    expect(validatePhone("1234567890")).toBe(true);  // Valido
    expect(validatePhone("9876543210")).toBe(true);  // Valido
    expect(validatePhone("12345")).toBe(false);       // No valido (menos de 10 digitos)
    expect(validatePhone("abcdefghij")).toBe(false);  // No vslido (no son numeros)
    expect(validatePhone("98765432101")).toBe(false); // No valido (mas de 10 digitos)
});



