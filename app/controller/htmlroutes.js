app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/../view/html/index.html"));
});
