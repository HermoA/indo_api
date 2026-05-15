import ftp from "basic-ftp";

export const getFTPClient = async () => {
  try {
    const client = new ftp.Client();
    await client.access({
      host: "ftp.indoamericalaradio.com",
      user: "uploadimg@indoamericalaradio.com",
      password: "Indo_2025",
      secure: false, // true si tu FTP es FTPS
    });
    return client;
  } catch (error) {
    client.close(); // cerrar en caso de error
    throw new Error("No se pudo conectar al servidor FTP");
  }
};
