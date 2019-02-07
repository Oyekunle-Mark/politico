import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool('postgres://taugumejxpteng:823f783c86572a3d20debaf1139a736c577e0cec04f53d9b1fc14903879fd8d8@ec2-174-129-224-157.compute-1.amazonaws.com:5432/d13pisalls339h');

export default db;
