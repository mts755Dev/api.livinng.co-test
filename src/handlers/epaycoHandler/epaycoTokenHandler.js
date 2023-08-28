import createLinkPayment from '../../controllers/epayco/createLinkPayment.js';

export const epaycoTokenHandler = async (req, res) => {
  const info = req.body
try {
  const epaycoToken = await createLinkPayment(info)
  if(epaycoToken.error) return res.status(404).send(epaycoToken.error)
  return res.status(200).send(epaycoToken.msg)
} catch (error) {
return res.status(500).send(error.message)
}
}
