import prisma from '../../db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';
const BCRYPT_SALT_ROUNDS = 10;

export const registerFirstAdmin = async (params: {
  name: string;
  email: string;
  password: string;
  bootstrapSecret: string;
}) => {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    const err: any = new Error('Admin already exists');
    err.status = 403;
    throw err;
  }
  const expected = process.env.ADMIN_BOOTSTRAP_SECRET;
  if (!expected || params.bootstrapSecret !== expected) {
    const err: any = new Error('Invalid bootstrap secret');
    err.status = 403;
    throw err;
  }
  const hash = await bcrypt.hash(params.password, BCRYPT_SALT_ROUNDS);
  const admin = await prisma.adminUser.create({
    data: {
      name: params.name,
      email: params.email,
      passwordHash: hash,
      role: 'OWNER',
    },
  });
  return admin;
};

export const login = async (email: string, password: string) => {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const token = jwt.sign(
    { adminId: admin.id, role: admin.role, tokenVersion: admin.tokenVersion },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { admin, token };
};

export const logout = async (adminId: string) => {
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { tokenVersion: { increment: 1 } },
  });
};

export const changePassword = async (adminId: string, currentPassword: string, newPassword: string) => {
  const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
  if (!admin) {
    const err: any = new Error('Admin not found');
    err.status = 404;
    throw err;
  }
  const matches = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!matches) {
    const err: any = new Error('Current password incorrect');
    err.status = 401;
    throw err;
  }
  const newHash = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { passwordHash: newHash, tokenVersion: { increment: 1 } },
  });
};
