import dotenv from 'dotenv';
dotenv.config();

import app from './serverApp';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SalonBook server running on port ${PORT}`);
});

export default app;
