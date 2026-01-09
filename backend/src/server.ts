import 'dotenv/config';
import app from './app';

//Fallback to ensure the server starts even if the environment variable is not set
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})