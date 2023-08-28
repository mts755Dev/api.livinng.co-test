import axios from "axios";
import { prisma } from "../../db.js";
import cron from "node-cron";
const { ENTITY_CLIENT } = process.env

const crearToken = async (req, res) => {
  try {
    const { data } = await axios.post(
      "https://apify.epayco.co/login/mail",
      "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ENTITY_CLIENT,
        },
      }
    );
    await prisma.token.create({
      data: data,
    });
   return res.status(200).send("El token fue creado exitosamente")
  } catch (error) {
    return res.status(500).send(error.message)
  }
};
cron.schedule("*/40 * * * *", async () => {
  await crearToken();
});
export default crearToken;
