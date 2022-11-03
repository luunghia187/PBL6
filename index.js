var express = require("express");
const cors = require("cors");
// var cookies = require("cookie-parser");
var app = express();
const http = require('http');

const normalizePort = require('normalize-port');
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
// app.use(cookies());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

//cac router
// require("./src/routers/home.router")(app);
// require("./src/routers/user.router")(app);
// require("./src/routers/userPer.router")(app);
// require("./src/routers/phim.router")(app);
// require("./src/routers/thongBao.router")(app);
// require("./src/routers/dienVien.router")(app);
// require("./src/routers/matHang.router")(app);
// require("./src/routers/lichChieu.router")(app);
// require("./src/routers/doanhThu.router")(app);
// require("./src/routers/giaoDich.router")(app);
// require("./src/routers/maVach.router")(app);
// require("./src/routers/chiTietGiaoDich.router")(app);
// require("./src/routers/seat.router")(app);
// require("./src/routers/seatNum.router")(app);
// require("./src/routers/room.router")(app);
// require("./src/routers/admin.router")(app);

const server = http.createServer(app);

server.listen(port, function () {
  console.log("Server listening on http://localhost:5000");
});
