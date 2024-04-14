const express = require("express");

const getBarCode = require("./getBarcodeData");
const app = express();

//get data from req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/barcode/:id", async (req, res) => {
  const barCodeId = req.params.id;
  const data = await getBarCode(barCodeId);
  if (!data?.categoty) {
    res.json({
      message: "successfully fetched the data",
      data: {},
      error: "barcode number is not valid",
    });
  } else {
    res.json({ message: "barcode data fetched succefully", data, error: {} });
  }
});

app.get("*", (req, res) => res.json({ message: "you are on home route" }));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server is running on port number", PORT);
});
