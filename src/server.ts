import app from "./app";

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
} else {
  //code 2
}
