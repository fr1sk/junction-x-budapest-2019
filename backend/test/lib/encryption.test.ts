import {decrypt, encrypt} from "../../src/lib/encryption";

describe('Test encryption', (): void => {

    it('should encrypt and decrypt with success', async (): Promise<void> => {

        const data = JSON.stringify({
            currency: 'EUR',
            amount: 100

        });
        const qr_code_data = encrypt(data);
        console.log(qr_code_data);

        const qr_code_decrypted = decrypt(qr_code_data);
        console.log(qr_code_decrypted);
        expect(data).toBe(qr_code_decrypted);
    });
});
