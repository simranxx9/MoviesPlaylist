//Functions to handle sending of emails

'use strict';
const nodeMailer = require('nodemailer');
const pdf = require("html-pdf");
async function htmlToPdfBuffer(html) {
  return new Promise((resolve, reject) => {
    pdf.create(html).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

//Send Email
exports.sendMail = async function ({ recipientMails, subject, plainTextEmail = "", htmlEmail = "" }, attachmentsEmail = []) {

  if (attachmentsEmail.length != 0) {
    var attachmentsP = attachmentsEmail.map(async (data) => {
      var datax = await htmlToPdfBuffer(data.html);
      return ({ filename: data.name + ".pdf", content: datax })
    })
    Promise.all(attachmentsP).then((res) => {
      const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
            user: 'joeytribbiani048@gmail.com',
            pass: 'joey@tribbiani'
          }
      });
      const mailOptions = {
       from: '"Joey Tribbiani"<joeytribbiani048@gmail.com>',// sender address
        to: recipientMails, // list of receivers
        subject, // Subject line
        text: plainTextEmail, // plain text body
        html: htmlEmail,// html body
        attachments: res
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);

        } else {
          console.log({ success: true })
        }
      });
    });

  }
  else {
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,  //true for 465 port, false for other ports
      auth: {
        user: 'joeytribbiani048@gmail.com',
        pass: 'joey@tribbiani'
      }
    });
    const mailOptions = {
      from: '"Joey Tribbiani"<joeytribbiani048@gmail.com>', // sender address
      to: recipientMails, // list of receivers
      subject, // Subject line
      text: plainTextEmail, // plain text body
      html: htmlEmail,// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);

      } else {
        console.log({ success: true })
      }
    });
  }
}