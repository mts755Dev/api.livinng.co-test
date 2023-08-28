import {prisma} from '../../db.js';
import axios from 'axios';

const createLinkPayment = async (info) => {
let {quantity, onePayment, amount,currency, id, base ,description, title,  typeSell, tax, email  } = info
   if (!quantity || !onePayment || !amount || !currency || !description || !title ||  !typeSell || !email ) {
     return {error:"Faltan datos"}
   }
amount = amount/2

const lastToken = await prisma.token.findMany()
let ultimo = lastToken[lastToken.length - 1]

const { data } = await axios.post(
 'https://apify.epayco.co/collection/link/create',

  {
      quantity: quantity,
      onePayment: onePayment,
      amount: amount,
      currency: currency,
      id: id,
      base: base,
      description: description,
      title: title,
      typeSell: typeSell,
      tax: tax,
      email: email,
  },
 {
     headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${ultimo.token}`,
     },
 }
 )


console.log("data antes del link",data) 
  
  if(data) {
    await prisma.epayco.create({
      data: {
        title : data.data.title,
        id : data.data.txtCode,
        email : email,
        routeLink : data.data.routeLink,
        amount : amount
      }
    })
  }
return { msg :`El link fue creado correctamente:  ${data.data.routeLink} `}
}


export default createLinkPayment;
