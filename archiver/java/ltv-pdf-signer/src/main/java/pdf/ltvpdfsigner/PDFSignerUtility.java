package pdf.ltvpdfsigner;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

import pdf.ltvpdfsigner.implementation.SecurePDFImpl;

public class PDFSignerUtility {

    public static void main(String[] args) {
        // Check if the correct number of arguments is provided
        if (args.length != 6) {
            System.out.println("Usage: java PDFSignerUtility <input-pdf-path> <output-pdf-path> <keystore-path> <keystore-password> <tsa-client> <key-alias>");
            return;
        }

        // Extract arguments
        String inputFilePath = args[0];
        String outputFilePath = args[1];
        String keystorePath = args[2];
        String keystorePassword = args[3];
        String tsaClient = args[4];
        String keyAlias = args[5];
        System.out.println(inputFilePath);
		System.out.println(outputFilePath);
		System.out.println(keystorePath);
		System.out.println(keystorePassword);
		System.out.println(tsaClient);
		System.out.println(keyAlias);

        // Create an instance of SecurePDFImpl using the command-line arguments
        SecurePDFImpl securePDF = new SecurePDFImpl(keystorePath, keystorePassword, tsaClient, keyAlias, 1);

        try (FileInputStream inputStream = new FileInputStream(new File(inputFilePath));
             FileOutputStream outputStream = new FileOutputStream(new File(outputFilePath))) {

            System.out.println("Signing PDF...");
            securePDF.signPDF(inputStream, outputStream);
            System.out.println("PDF signed successfully. Output saved to " + outputFilePath);

        } catch (IOException | UnrecoverableKeyException | CertificateException | NoSuchAlgorithmException | KeyStoreException e) {
            System.err.println("An error occurred while signing the PDF: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
