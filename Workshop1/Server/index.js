const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

/*[
  { name: "Afganistán", currency: "AFN" },
  { name: "Albania", currency: "ALL" },
  { name: "Argelia", currency: "DZD" },
  { name: "Andorra", currency: "EUR" },
  { name: "Angola", currency: "AOA" },
  { name: "Argentina", currency: "ARS" },
  { name: "Armenia", currency: "AMD" },
  { name: "Australia", currency: "AUD" },
  { name: "Austria", currency: "EUR" },
  { name: "Azerbaiyán", currency: "AZN" },
  { name: "Bahamas", currency: "BSD" },
  { name: "Bahrein", currency: "BHD" },
  { name: "Bangladesh", currency: "BDT" },
  { name: "Barbados", currency: "BBD" },
  { name: "Belarús", currency: "BYN" },
  { name: "Bélgica", currency: "EUR" },
  { name: "Belice", currency: "BZD" },
  { name: "Benín", currency: "XOF" },
  { name: "Bután", currency: "BTN" },
  { name: "Bolivia", currency: "BOB" },
  { name: "Bosnia y Herzegovina", currency: "BAM" },
  { name: "Botswana", currency: "BWP" },
  { name: "Brasil", currency: "BRL" },
  { name: "Brunéi", currency: "BND" },
  { name: "Bulgaria", currency: "BGN" },
  { name: "Burkina Faso", currency: "XOF" },
  { name: "Burundi", currency: "BIF" },
  { name: "Cabo Verde", currency: "CVE" },
  { name: "Camboya", currency: "KHR" },
  { name: "Camerún", currency: "XAF" },
  { name: "Canadá", currency: "CAD" },
  { name: "República Centroafricana", currency: "XAF" },
  { name: "Chad", currency: "XAF" },
  { name: "Chile", currency: "CLP" },
  { name: "China", currency: "CNY" },
  { name: "Colombia", currency: "COP" },
  { name: "Comoras", currency: "KMF" },
  { name: "Congo", currency: "XAF" },
  { name: "Costa Rica", currency: "CRC" },
  { name: "Croacia", currency: "HRK" },
  { name: "Cuba", currency: "CUP" },
  { name: "Chipre", currency: "EUR" },
];*/
