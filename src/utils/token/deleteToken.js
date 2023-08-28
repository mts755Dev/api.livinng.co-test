import { prisma } from "../../db.js";
import cron from "node-cron";

const deleteToken = async (req, res) => {

  const getOldToken = await prisma.token.findMany();
  const primero = getOldToken[0];
  if (getOldToken.length > 1) {
    let { id } = primero;
    try {
      await prisma.token.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).send("el token se elimino correctamente");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    return res.status(404).send("No hay suficientes token para borrar");
  }
};
cron.schedule("*/41 * * * *", async () => {
  await deleteToken();
});

export default deleteToken;
