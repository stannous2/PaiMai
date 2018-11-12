const router = require("express").Router();
var mailgun = require("mailgun-js")({ apiKey: process.env.MAILGUN_API, publicApiKey: process.env.MAILGUN_PUBLIC, domain: "mystia.club"});

router.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  let data = {
    from: `${body.name} <noreply@paim.ai>`,
    to: process.env.SUPPORT_EMAIL,
    subject: "New Support Request on PaiMai!",
    text: `Hey there, you have a new support email from someone!
      They say: ${body.text}
      Please respond in a timely manner at ${body.email}, thanks!
      `
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(error);
    res.json(body);
  });
    
});

module.exports = router;