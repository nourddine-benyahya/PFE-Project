const hotelReservation = require("../models/hotelReservationModel");

var nodemailer=require('nodemailer')





 const reservation=async (req, res, next) => {

    const {
        hotelName,
        checkInDate,
        checkOutDate,
        userName,
        totalPrice,
        totalDays,
        NbOfPer
    }= req.body

    try{
        const newReservation = new hotelReservation({
            hotelName,
            checkInDate,
            checkOutDate,
            userName,
            totalPrice,
            totalDays,
            NbOfPer
        });
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation);


        var transporter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 465,
            auth:{
                user:'elghazi.mohamed.ilyass@gmail.com',
                pass:"gmbjqsmnihhroizt"
            }
        })


        var mailoption={
            from:'elghazi.mohamed.ilyass@gmail.com',
            to:'nourddine.benyahya02@gmail.com',
            subject:'Thank you for your order',
            text: `Dear ${userName},\n` +
                    `Thank you for choosing our service and placing an order with us. We are thrilled to serve you! Here are the details of your order:\n` +
                    `user Name: ${userName}\n` +
                    `start date: ${checkInDate}\n` +
                    `fin date: ${checkOutDate}\n` +
                    `Total days: ${totalDays}\n` +
                    `Total Price: ${totalPrice}\n` +
                    `We will begin processing your order immediately. You will receive a confirmation email once your order is shipped.\n` +
                    `\n` +
                    `If you have any questions or need further assistance, please don't hesitate to contact our customer support team at [wa.7assaan@gmail.com] .\n` +
                    `\n` +
                    `Thank you again for your trust and support. We look forward to serving you.\n` +
                    `\n` +
                    `Best regards,\n` +
                    `wa7assssaan`

        }
        transporter.sendMail(mailoption,function(error,info){
            if(error){
                console.log("error")
            }else{
                console.log('email sent :' + info.response)
            }
        })

    }
    catch(err){
        next(err)
    }
};

const getAllReservation = async (req, res, next) => {
    
    try {
      const hotels = await hotelReservation.find({
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json(err);
    }
  };




module.exports = {
    reservation,
    getAllReservation
  };