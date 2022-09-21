import { PORT } from "./env/index.js";
import app from "./server.js";

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
